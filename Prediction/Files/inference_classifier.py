import pickle
import cv2
import mediapipe as mp
import numpy as np
import string

# Load trained model
model_dict = pickle.load(open('./model.p', 'rb'))
model = model_dict['model']

# Labels (A-Z)
letters = list(string.ascii_uppercase)
labels_dict = {i: letter for i, letter in enumerate(letters)}

# Webcam setup
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# Mediapipe hands
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(static_image_mode=False, min_detection_confidence=0.3)

EXPECTED_LENGTH = 42  # 21 landmarks * 2
BUFFER_SIZE = 15      # Number of frames for stable prediction

buffer = []
sequence = []

last_appended = None  # To prevent repeated letters

while True:
    ret, frame = cap.read()
    if not ret or frame is None:
        print("Camera not available or frame not captured!")
        break

    H, W, _ = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    predicted_character = None
    if results.multi_hand_landmarks:
        hand_landmarks = results.multi_hand_landmarks[0]

        if len(hand_landmarks.landmark) >= 21:
            x_, y_ = [], []
            for lm in hand_landmarks.landmark:
                x_.append(lm.x)
                y_.append(lm.y)

            data_aux = []
            for lm in hand_landmarks.landmark:
                data_aux.append(lm.x - min(x_))
                data_aux.append(lm.y - min(y_))

            while len(data_aux) < EXPECTED_LENGTH:
                data_aux.append(0)

            # Predict character
            prediction = model.predict([np.asarray(data_aux)])
            pred = prediction[0]

            # Support models that return numeric class indices or string labels
            try:
                if isinstance(pred, (int, np.integer)) or (hasattr(pred, 'dtype') and getattr(pred, 'dtype').kind in 'iu'):
                    idx = int(pred)
                    predicted_character = labels_dict.get(idx, str(idx))
                else:
                    predicted_character = str(pred)
            except Exception:
                predicted_character = str(pred)

            # Normalize some special labels for display
            display_char = predicted_character
            low = predicted_character.lower()
            if low == 'space':
                display_char = ' '
            elif low == 'nothing':
                display_char = '-'
            elif low == 'del':
                display_char = '<DEL>'

            # Update buffer
            buffer.append(predicted_character)
            if len(buffer) > BUFFER_SIZE:
                buffer.pop(0)

            # Only apply if prediction is stable and different from last appended
            if buffer.count(buffer[-1]) > BUFFER_SIZE // 2:
                if last_appended != buffer[-1]:
                    stable_label = buffer[-1]
                    low_label = stable_label.lower()

                    # Handle special action labels
                    if low_label == 'del':
                        if sequence:
                            sequence.pop()
                        last_appended = stable_label
                    elif low_label == 'space':
                        sequence.append(' ')
                        last_appended = stable_label
                    elif low_label == 'nothing':
                        # do not modify sequence
                        last_appended = stable_label
                    else:
                        # Regular character label (e.g., 'A')
                        # If label is numeric index string, attempt to map
                        char_to_append = stable_label
                        try:
                            if char_to_append.isdigit():
                                idx = int(char_to_append)
                                char_to_append = labels_dict.get(idx, char_to_append)
                        except Exception:
                            pass

                        sequence.append(char_to_append)
                        last_appended = stable_label

            # Draw bounding box safely
            x1 = max(int(min(x_) * W) - 10, 0)
            y1 = max(int(min(y_) * H) - 10, 0)
            x2 = min(int(max(x_) * W) + 10, W)
            y2 = min(int(max(y_) * H) + 10, H)

            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
            cv2.putText(frame, display_char, (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3, cv2.LINE_AA)

            # Draw landmarks
            mp_drawing.draw_landmarks(
                frame,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style()
            )
    else:
        # No hand detected: update buffer with 'nothing' so the system
        # registers a clear period. After a stable 'nothing' window,
        # allow the same character to be appended again by resetting
        # `last_appended`.
        buffer.append('nothing')
        if len(buffer) > BUFFER_SIZE:
            buffer.pop(0)

        if buffer.count('nothing') > BUFFER_SIZE // 2:
            last_appended = None

    # Show the detected sequence persistently
    cv2.putText(frame, "Sequence: " + "".join(sequence[-50:]), (10, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)       #Color changed to white for better visibility

    # Show frame
    cv2.imshow('ASL Inference', frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

# Print final joined sequence to terminal when exiting
final_text = "".join(sequence)
print("Final sequence:", final_text)