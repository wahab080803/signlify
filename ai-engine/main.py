import cv2
import mediapipe as mp
import numpy as np
import torch
import torch.nn as nn
import os
import pickle
import base64
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

# --- 1. Model Definitions (From your provided code) ---

class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=60):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-np.log(10000.0) / d_model))
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe.unsqueeze(0))

    def forward(self, x):
        return x + self.pe[:, :x.size(1)]

class SignTransformer(nn.Module):
    def __init__(self, input_dim=258, num_classes=25, dim_model=128, nhead=8, num_layers=4, dropout=0.3):
        super(SignTransformer, self).__init__()
        self.input_projection = nn.Linear(input_dim, dim_model)
        self.pos_encoder = PositionalEncoding(dim_model)
        encoder_layer = nn.TransformerEncoderLayer(d_model=dim_model, nhead=nhead, batch_first=True, dropout=dropout)
        self.transformer_encoder = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)
        self.fc = nn.Linear(dim_model, num_classes)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        x = self.input_projection(x)
        x = self.pos_encoder(x)
        x = self.transformer_encoder(x)
        x = torch.mean(x, dim=1) 
        x = self.dropout(x)
        x = self.fc(x)
        return x

# --- 2. Initialization & Loading ---

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load Word-Level Model[cite: 1]
word_label_map = np.load(os.path.join(BASE_DIR, 'label_classes_drive.npy'), allow_pickle=True)
word_model = SignTransformer(num_classes=len(word_label_map)).to(device)
word_model.load_state_dict(torch.load(os.path.join(BASE_DIR, "sign_transformer_model_drive.pth"), map_location=device))
word_model.eval()

# Load Character-Level Model[cite: 2]
char_model_path = os.path.join(BASE_DIR, 'character_model.p')
with open(char_model_path, 'rb') as f:
    char_model_dict = pickle.load(f)
char_model = char_model_dict['model']
char_labels = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ") # Adjust based on your labels_dict[cite: 2]

# Mediapipe Setup
# Mediapipe Setup
# Using the standard access method which is more version-stable
# Standard initialization
mp_holistic = mp.solutions.holistic.Holistic(
    min_detection_confidence=0.5, 
    min_tracking_confidence=0.5
)

# --- 3. Helper Functions ---

def extract_landmarks(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([pose, lh, rh]) # Total 258 features[cite: 1]

# --- 4. WebSocket for Real-time Prediction ---

@app.websocket("/ws/predict/{mode}")
async def websocket_predict(websocket: WebSocket, mode: str):
    await websocket.accept()
    sequence = []
    stability_buffer = []  # <--- Added
    STABILITY_THRESHOLD = 5 # <--- Added
    
    try:
        while True:
            # Receive image frame from React (Base64 string)
            data = await websocket.receive_text()
            header, encoded = data.split(",", 1)
            nparr = np.frombuffer(base64.b64decode(encoded), np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            # Process frame with MediaPipe
            results = mp_holistic.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            
            prediction = ""
            
            if mode == "word":
                keypoints = extract_landmarks(results)
                sequence.append(keypoints)
                sequence = sequence[-60:] # 60 frame buffer[cite: 1]
                
                if len(sequence) == 60 and (results.left_hand_landmarks or results.right_hand_landmarks):
                    input_data = torch.tensor(np.array(sequence), dtype=torch.float32).unsqueeze(0).to(device)
                    with torch.no_grad():
                        res = word_model(input_data)
                        prob = torch.softmax(res, dim=1)
                        confidence, idx = torch.max(prob, dim=1)
                        if confidence.item() > 0.8: # Confidence threshold[cite: 1]
                            prediction = word_label_map[idx.item()]
            
            elif mode == "character":
                if results.right_hand_landmarks: # Focus on one hand for character[cite: 2]
                    landmarks = results.right_hand_landmarks.landmark
                    x_ = [lm.x for lm in landmarks]
                    y_ = [lm.y for lm in landmarks]
                    data_aux = []
                    for lm in landmarks:
                        data_aux.append(lm.x - min(x_))
                        data_aux.append(lm.y - min(y_))
                    
                    pred = char_model.predict([np.asarray(data_aux)])
                    prediction = char_labels[int(pred[0])] # Prediction index[cite: 2]

            await websocket.send_json({"prediction": prediction})

    except Exception as e:
        print(f"Error: {e}")
    finally:
        await websocket.close()