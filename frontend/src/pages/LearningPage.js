import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const LearningPage = () => {
  const location = useLocation();
  
  // Requirement: Display username passed from Login/Dashboard
  const userName = location.state?.username || "User";

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

      <h2 style={{ marginBottom: '10px' }}>ASL Learning Center</h2>

      {/* Placeholder for Partner's Content */}
      <div style={contentBoxStyle}>
        <h3 style={{ color: '#61dafb' }}>Master the Alphabet</h3>
        <p>
          Welcome to the learning module. Here, you will find interactive lessons 
          designed to help you master American Sign Language (ASL).
        </p>
        <div style={partnerNoticeStyle}>
          Partner: Add your learning components, video feeds, or sign guides here.
        </div>
      </div>
    </div>
  );
};

// --- Styles ---

const contentBoxStyle = {
  background: '#1c1e22',
  padding: '40px',
  borderRadius: '15px',
  border: '1px solid #444',
  maxWidth: '800px',
  width: '90%',
  textAlign: 'center',
  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
};

const partnerNoticeStyle = {
  marginTop: '30px',
  padding: '20px',
  border: '1px dashed #61dafb',
  color: '#61dafb',
  borderRadius: '8px',
  fontSize: '0.9rem'
};

export default LearningPage;