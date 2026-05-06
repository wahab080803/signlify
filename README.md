# SignLify
SignLify is a full-stack MERN + Flask application which is an AI-powered application designed to bridge the communication gap between the deaf/hard-of-hearing community and the general public. It utilizes advanced computer vision and deep learning architectures to translate American Sign Language (ASL) into text in real-time, supporting both character-level (alphabets) and very few word-level (full signs) recognition.

# Project Overview
The system captures video input via a webcam, processes the frames to extract anatomical landmarks, and uses trained models to predict the corresponding sign. It is built with a decoupled architecture, using a high-performance Python backend for AI inference and a responsive React frontend for the user interface.
# Key Features:
1. Dual-Mode Recognition: Supports both Character-Level (isolated alphabets) and Word-Level (complex gestures) translation.
2. Real-Time Processing: Leverages WebSockets for low-latency communication between the client and the AI engine.
3. High Accuracy: Features a SignTransformer architecture that uses self-attention mechanisms to understand the temporal sequence of signs.
4. Robust Landmark Tracking: Uses MediaPipe Holistic to track 258 unique landmarks across the face, pose, and hands.
5. Stability Logic: Implements a "Top-K Confidence Gap" and stability buffers to prevent flickering and ensure high-confidence predictions.

# Tech Stack
Frontend
1. React.js: For a dynamic, component-based user interface.
2. Tailwind CSS: For modern, responsive styling.
Backend (AI Engine)
1. FastAPI: A high-performance Python web framework for handling API and WebSocket requests.
2. PyTorch: The deep learning framework used for building and running the SignTransformer model.
3. MediaPipe: For real-time extraction of hand and body landmarks.
4. OpenCV: For image processing and frame manipulation.

# System Architecture
1. Data Collection & Preprocessing
2. The SignTransformer Model
