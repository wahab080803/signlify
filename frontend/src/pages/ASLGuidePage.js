import React from 'react';
import { Link } from 'react-router-dom';

const ASLGuidePage = () => {
  const lightBlue = "#61dafb";

  const guideData = [
    { title: "The Alphabet", desc: "Start with the basics. ASL uses 26 handshapes to represent English letters.", icon: "🔠" },
    { title: "Facial Expressions", desc: "In ASL, your face is your 'tone of voice.' It conveys emotion and intent.", icon: "😊" },
    { title: "Hand Orientation", desc: "The direction your palm faces can completely change a word's meaning.", icon: "✋" },
    { title: "Movement", desc: "Motion is key for word-level signs like 'Happy' or 'Working'.", icon: "🔄" }
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

      {/* Animation Section Placeholder */}
      <section style={animationSectionStyle}>
        <h2 style={{ color: 'white' }}>Common Signs in Motion</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={animationPlaceholder}>
             {/* Replace with <img src={helloGif} /> later */}
             <p>Hello.gif</p>
          </div>
          <div style={animationPlaceholder}>
             <p>ThankYou.gif</p>
          </div>
          <div style={animationPlaceholder}>
             <p>Help.gif</p>
          </div>
        </div>
      </section>

      {/* CSS for hover effect (you can add this to your index.css) */}
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

const animationPlaceholder = {
  width: '250px',
  height: '250px',
  background: '#282c34',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed #444',
  color: '#666'
};

export default ASLGuidePage;