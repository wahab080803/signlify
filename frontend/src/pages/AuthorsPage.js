import React from 'react';
import { Link } from 'react-router-dom';
// Import your images from the assets folder
import wahabPic from '../assets/wahab.jpeg'; 
import irtazaPic from '../assets/irtaza.jpeg';

const AuthorsPage = () => {
  const lightBlue = "#61dafb";

  return (
    <div className="App-header" style={{ justifyContent: 'flex-start', minHeight: '100vh', paddingTop: '40px' }}>
      <Link to="/" style={{ alignSelf: 'flex-start', marginLeft: '5%', color: lightBlue, textDecoration: 'none', marginBottom: '20px' }}>
        ← Back to Home
      </Link>

      <h1 style={{ color: lightBlue, marginBottom: '10px' }}>Meet the Team</h1>
      <p style={{ opacity: 0.8, marginBottom: '50px' }}>The developers behind SignLify at FAST NUCES Lahore.</p>

      <div style={teamContainerStyle}>
        
        {/* Author 1: Wahab */}
        <div style={authorCardStyle}>
          <img src={wahabPic} alt="Abdul Wahab" style={imageStyle} />
          <h2 style={{ margin: '15px 0 5px 0' }}>Abdul Wahab</h2>
          <p style={{ color: lightBlue, fontWeight: 'bold' }}>Lead AI & Backend Developer</p>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#ccc' }}>
            Specializing in FastAPI and Machine Learning. Wahab developed the 
            Sign Transformer architecture and WebSocket integration for real-time translation.
          </p>
          <div style={socialLinksStyle}>
             <a href="https://github.com/wahab080803" target="_blank" rel="noreferrer" style={iconLink}>GitHub</a>
          </div>
        </div>

        {/* Author 2: Irtaza */}
        <div style={authorCardStyle}>
          <img src={irtazaPic} alt="Irtaza Sameel" style={imageStyle} />
          <h2 style={{ margin: '15px 0 5px 0' }}>Irtaza Sameel</h2>
          <p style={{ color: lightBlue, fontWeight: 'bold' }}>Frontend & UI/UX Designer</p>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#ccc' }}>
            Focused on creating accessible and intuitive user interfaces. Irtaza 
            led the development of the Learning Mode and the React-based Dashboard.
          </p>
          <div style={socialLinksStyle}>
             <a href="#" style={iconLink}>LinkedIn</a>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Responsive Styles ---

const teamContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  flexWrap: 'wrap', // This makes it responsive
  width: '90%',
  maxWidth: '1200px',
  paddingBottom: '50px'
};

const authorCardStyle = {
  background: '#1c1e22',
  padding: '30px',
  borderRadius: '20px',
  width: '320px',
  textAlign: 'center',
  border: '1px solid #444',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
};

const imageStyle = {
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '4px solid #61dafb'
};

const socialLinksStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
  gap: '15px'
};

const iconLink = {
  color: '#61dafb',
  textDecoration: 'none',
  fontSize: '0.9rem',
  border: '1px solid #61dafb',
  padding: '5px 15px',
  borderRadius: '5px'
};

export default AuthorsPage;