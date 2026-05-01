# 5
import cv2
import mediapipe as mp
import numpy as np
import torch
import torch.nn as nn

# 1. Load the Label Encoder Classes
label_map = np.load('label_classes_drive.npy', allow_pickle=True)
num_classes = len(label_map)

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
    # CHANGED: num_layers to 4 to match your training file
    def __init__(self, input_dim=258, num_classes=num_classes, dim_model=128, nhead=8, num_layers=4, dropout=0.3):
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

# Initialize Model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = SignTransformer(num_classes=num_classes).to(device)
model.load_state_dict(torch.load("sign_transformer_model_drive.pth", map_location=device))
model.eval()

mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

def extract_landmarks_from_frame(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([pose, lh, rh])

# Real-time Variables
sentence = []
stability_buffer = []
STABILITY_THRESHOLD = 5 
cap = cv2.VideoCapture(0)
sequence = []

with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret: break

        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = holistic.process(image)
        
        # Draw skeleton
        mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)
        mp_drawing.draw_landmarks(frame, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
        mp_drawing.draw_landmarks(frame, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

        # Collect data
        keypoints = extract_landmarks_from_frame(results)
        sequence.append(keypoints)
        sequence = sequence[-60:]

        # NEW: Check if hands are actually visible
        hands_visible = results.left_hand_landmarks or results.right_hand_landmarks

        if len(sequence) == 60 and hands_visible:
            input_data = torch.tensor(np.array(sequence), dtype=torch.float32).unsqueeze(0).to(device)
            
            with torch.no_grad():
                res = model(input_data)
                prob = torch.softmax(res, dim=1)
                top_probs, top_idxs = torch.topk(prob, 2, dim=1)
                
                confidence = top_probs[0][0].item()
                second_confidence = top_probs[0][1].item()
                idx = top_idxs[0][0].item()

            # Confidence Gap Logic (Professor's Request)
            if confidence > 0.8 and (confidence - second_confidence) > 0.20:
                predicted_word = label_map[idx]
                stability_buffer.append(predicted_word)
                stability_buffer = stability_buffer[-STABILITY_THRESHOLD:]
                
                # Stability Check & Duplicate Prevention
                if stability_buffer.count(predicted_word) == STABILITY_THRESHOLD:
                    if not sentence or predicted_word != sentence[-1]:
                        sentence.append(predicted_word)
                        sentence = sentence[-7:] # Show last 7 words
                
                cv2.rectangle(frame, (0,0), (640, 40), (245, 117, 16), -1)
                cv2.putText(frame, f'PREDICTED: {predicted_word.upper()}', (15, 30), 
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
            else:
                cv2.rectangle(frame, (0,0), (640, 40), (50, 50, 50), -1)
                cv2.putText(frame, 'WAITING FOR CLEAR SIGN...', (15, 30), 
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (200, 200, 200), 2, cv2.LINE_AA)
        else:
            # If hands go out of frame, clear the stability buffer so it doesn't "remember" old signs
            stability_buffer = []
            cv2.rectangle(frame, (0,0), (640, 40), (0, 0, 255), -1)
            cv2.putText(frame, 'NO HANDS DETECTED', (15, 30), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

        # Draw Sentence Bar
        cv2.rectangle(frame, (0, 430), (640, 480), (0, 0, 0), -1)
        cv2.putText(frame, f'SENTENCE: {" ".join(sentence).upper()}', (15, 465), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2, cv2.LINE_AA)

        cv2.imshow('SignBridge AI - School Environment', frame)
        
        key = cv2.waitKey(1)
        if key & 0xFF == ord('q'): break
        elif key & 0xFF == ord('c'): sentence = []

cap.release()
cv2.destroyAllWindows()

# --- NEW: Print final result to console ---
print("\n" + "="*30)
print("FINAL TRANSLATED SENTENCE:")
print(" ".join(sentence).upper())
print("="*30)