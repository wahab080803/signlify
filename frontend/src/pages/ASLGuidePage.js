import React from 'react';
import { Link } from 'react-router-dom';

// 1. Import your video files
import studentVideo from '../assets/Videos/student.mp4';
import teacherVideo from '../assets/Videos/teacher.mp4';
import whatVideo from '../assets/Videos/what.mp4';

const ASLGuidePage = () => {
  const lightBlue = "#61dafb";

  const guideData = [
    { title: "The Alphabet", desc: "Start with the basics. ASL uses 26 handshapes to represent English letters.", icon: "🔠" },
    { title: "Facial Expressions", desc: "In ASL, your face is your 'tone of voice.' It conveys emotion and intent.", icon: "😊" },
    { title: "Hand Orientation", desc: "The direction your palm faces can completely change a word's meaning.", icon: "✋" },
    { title: "Movement", desc: "Motion is key for word-level signs like 'Happy' or 'Working'.", icon: "🔄" }
  ];

  // 2. Data array for the video section
  const videoSigns = [
    { title: "Student", src: studentVideo },
    { title: "Teacher", src: teacherVideo },
    { title: "What", src: whatVideo }
  ];

  return (
    <div className="App-header" style={{ justifyContent: 'flex-start', minHeight: '100vh', paddingTop: '40px' }}>
      <Link to="/" style={{ alignSelf: 'flex-start', marginLeft: '5%', color: lightBlue, textDecoration: 'none', marginBottom: '20px' }}>
        ← Back to Home
      </Link>

      <h1 style={{ color: lightBlue, textAlign: 'center' }}>Mastering American Sign Language</h1>
      <p style={{ maxWidth: '700px', textAlign: 'center', opacity: 0.8, marginBottom: '50px' }}>
        A quick guide to the fundamentals of ASL. Use these tips to improve your accuracy with the SignLify model.
      </p>

      {/* Grid of Info Cards */}
      <div style={gridStyle}>
        {guideData.map((item, index) => (
          <div key={index} style={guideCardStyle} className="guide-card">
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{item.icon}</div>
            <h3 style={{ color: lightBlue }}>{item.title}</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#ccc' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Updated Video Section */}
      <section style={animationSectionStyle}>
        <h2 style={{ color: 'white', marginBottom: '30px' }}>Common Signs in Motion</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {videoSigns.map((sign, index) => (
            <div key={index} style={videoContainerStyle}>
              <video 
                src={sign.src} 
                autoPlay 
                loop 
                muted 
                playsInline 
                style={videoElementStyle}
              />
              <p style={{ color: lightBlue, marginTop: '10px', fontWeight: 'bold' }}>"{sign.title}"</p>
            </div>
          ))}
        </div>
      </section>

      <style>
        {`
          .guide-card:hover {
            transform: translateY(-10px);
            border-color: #61dafb !important;
            box-shadow: 0 15px 40px rgba(97, 218, 251, 0.2) !important;
          }
        `}
      </style>
    </div>
  );
};

// --- Styles ---

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '30px',
  width: '90%',
  maxWidth: '1200px',
  padding: '0 20px'
};

const guideCardStyle = {
  background: '#1c1e22',
  padding: '40px 20px',
  borderRadius: '20px',
  border: '1px solid #333',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  cursor: 'default'
};

const animationSectionStyle = {
  marginTop: '80px',
  width: '100%',
  padding: '60px 0',
  backgroundColor: '#16181d',
  textAlign: 'center'
};

// Container for the video and its label
const videoContainerStyle = {
  background: '#1c1e22',
  padding: '15px',
  borderRadius: '20px',
  border: '1px solid #333',
  width: '280px'
};

// The actual video styling
const videoElementStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
};

export default ASLGuidePage;