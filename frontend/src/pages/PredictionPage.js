import React, { useState, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Added missing imports[cite: 1]
import Webcam from 'react-webcam';

const PredictionPage = () => {
  const [mode, setMode] = useState('character');
  const [sentence, setSentence] = useState(''); 
  const webcamRef = useRef(null);
  const ws = useRef(null);
  
  // Navigation hooks[cite: 1]
  const location = useLocation();
  const navigate = useNavigate();
  
  // Requirement: Display username passed from Login/Dashboard[cite: 1]
  const userName = location.state?.username || "User";

  const connectWebSocket = useCallback(() => {
    if (ws.current) ws.current.close();
    ws.current = new WebSocket(`ws://localhost:8000/ws/predict/${mode}`);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const rawPrediction = data.prediction;

      if (rawPrediction) {
        setSentence((prev) => {
          let normalizedChar = rawPrediction.toLowerCase() === "space" ? " " : rawPrediction;
          
          if (mode === 'word') {
                const base = (prev === '' || prev.endsWith(" ")) ? prev : prev + " ";
                return base + normalizedChar + " ";
          }

          if (normalizedChar === " " && prev.endsWith(" ")) return prev;
          if (normalizedChar !== " " && prev.endsWith(normalizedChar)) return prev;
          
          return prev + normalizedChar;
        });
      }
    };
  }, [mode]);

  const capture = useCallback(() => {
    // 1. Check if the webcam and websocket are ready
    if (
      webcamRef.current && 
      ws.current && 
      ws.current.readyState === WebSocket.OPEN
    ) {
      // 2. Capture the current frame
      const imageSrc = webcamRef.current.getScreenshot();

      // 3. CRITICAL FIX: Only send if the image is NOT null or empty
      // This prevents the OpenCV "!_src.empty()" error on your backend
      if (imageSrc && imageSrc !== null) {
        ws.current.send(imageSrc);
      } else {
        console.warn("Skipping empty frame...");
      }
    } 
    else if (ws.current && ws.current.readyState === WebSocket.CONNECTING) {
      console.log("Waiting for WebSocket to open...");
    }
  }, [webcamRef]);

  React.useEffect(() => {
    connectWebSocket();
    
    const speed = mode === 'character' ? 1500 : 300; 
    const interval = setInterval(() => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        capture();
      }
    }, speed);

    return () => {
      clearInterval(interval);
      if (ws.current) ws.current.close();
    };
  }, [mode, connectWebSocket, capture]); 

  return (
    <div className="App-header" style={{ position: 'relative', justifyContent: 'flex-start', paddingTop: '40px' }}>
      
      {/* Back Arrow SVG - Navigates back to Dashboard[cite: 1] */}
      <Link 
        to="/dashboard" 
        state={{ username: userName }} // Passing name back to keep dashboard personalized[cite: 1]
        style={{ position: 'absolute', top: '20px', left: '20px', transition: 'transform 0.2s' }}
      >
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#61dafb" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ cursor: 'pointer' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </Link>

      <h2 style={{ marginBottom: '10px' }}>AI Sign-to-Text Prediction</h2>

      {/* Mode Selection Buttons[cite: 2] */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setMode('character')}
          style={mode === 'character' ? activeBtnStyle : inactiveBtnStyle}
        >
          Character Level
        </button>
        <button 
          onClick={() => setMode('word')}
          style={mode === 'word' ? activeBtnStyle : inactiveBtnStyle}
        >
          Word Level
        </button>
      </div>

      {/* Main Layout Container[cite: 2] */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', width: '90%', maxWidth: '1200px' }}>
        
        {/* Left Side: Webcam Feed[cite: 2] */}
        <div style={{ flex: 1, position: 'relative' }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: '100%', borderRadius: '15px', border: '4px solid #444', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
          />
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem' }}>
            🔴 Live Feed: {mode.toUpperCase()} MODE
          </div>
        </div>

        {/* Right Side: Results Display[cite: 2] */}
        <div style={{ flex: 0.8, background: '#1c1e22', padding: '30px', borderRadius: '15px', textAlign: 'left', border: '1px solid #444' }}>
          <div>
            <h3 style={{ color: '#61dafb', margin: '0 0 10px 0' }}>Translated Sentence</h3>
            <div style={{ 
              background: '#282c34', 
              padding: '15px', 
              borderRadius: '8px', 
              minHeight: '100px', 
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap', 
              fontSize: '1.2rem',
              color: 'white'
            }}>
              {sentence || 'Waiting for signs...'}
            </div>
          </div>

          <button 
            onClick={() => setSentence('')}
            style={{ 
              marginTop: '20px', 
              width: '100%', 
              background: '#ff4b2b', 
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Clear Sentence
          </button>
        </div>
      </div>
    </div>
  );
};

const activeBtnStyle = { background: '#61dafb', color: '#282c34', fontWeight: 'bold', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' };
const inactiveBtnStyle = { background: '#444', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' };

export default PredictionPage;