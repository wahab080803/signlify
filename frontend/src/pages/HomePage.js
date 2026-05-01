import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const lightBlue = "#61dafb";

  return (
    <div className="App-header" style={{ justifyContent: 'flex-start', overflowY: 'auto', height: '100vh', scrollBehavior: 'smooth' }}>
      
      {/* 1. Hero Section */}
      <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>
          Welcome to <span style={{ color: lightBlue }}>SignLify</span>
        </h1>
        <p style={{ fontSize: '1.4rem', maxWidth: '800px', textAlign: 'center' }}>
          Your AI-powered <span style={{ color: lightBlue }}>Sign-to-Text</span> Translation System.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
          <Link className="App-link" to="/login" style={linkButtonStyle}>
            Login
          </Link>
          <Link className="App-link" to="/signup" style={linkButtonStyle}>
            Sign Up
          </Link>
        </div>
      </section>

      {/* 2. Importance of ASL Section */}
      <section style={infoSectionStyle}>
        <h2 style={{ color: lightBlue }}>Why ASL Matters?</h2>
        <div style={{ display: 'flex', gap: '40px', marginTop: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={cardStyle}>
            <h3>500,000+</h3>
            <p>Users communicate through ASL daily in the US alone.</p>
          </div>
          <div style={cardStyle}>
            <h3>Bridge the Gap</h3>
            <p>SignLify breaks barriers between the hearing-impaired and the world.</p>
          </div>
          <div style={cardStyle}>
            <h3>Why SignLify?</h3>
            <p>Unlike others, we provide both <b>Character</b> and <b>Word</b> level real-time translation.</p>
          </div>
        </div>
      </section>

      {/* 3. Authors Section (Replacing Footer) */}
      <section style={infoSectionStyle}>
        <h2 style={{ color: lightBlue }}>Project Authors</h2>
        <div style={{ display: 'flex', gap: '50px', marginTop: '20px', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={avatarPlaceholder}>Author 1</div>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Abdul Wahab</p>
            <p>FAST NUCES Lahore</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={avatarPlaceholder}>Author 2</div>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Irtaza Sameel</p>
            <p>FAST NUCES Lahore</p>
          </div>
        </div>
      </section>

      {/* 4. Location & Contact Section */}
      <section style={{ ...infoSectionStyle, backgroundColor: '#1c1e22', borderTop: '1px solid #444', width: '100%' }}>
        <h2 style={{ color: lightBlue }}>Visit Us</h2>
        <p style={{ fontSize: '1.1rem' }}><b>FAST NUCES</b> - National University of Computer and Emerging Sciences</p>
        <p>B-Block, Faisal Town, Lahore, Punjab</p>
        <div style={{ marginTop: '20px', fontSize: '1rem', color: '#bbb' }}>
          <p>📞 Contact: +92 42 111 128 128</p>
          <p>📧 Support: support.signlify@fast.edu.pk</p>
        </div>
      </section>

    </div>
  );
};

// --- Styles ---

const linkButtonStyle = {
  fontSize: '1.2rem',
  textDecoration: 'none',
  border: `2px solid #61dafb`,
  color: '#61dafb',
  padding: '12px 25px',
  borderRadius: '8px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
};

const infoSectionStyle = {
  padding: '80px 20px',
  textAlign: 'center',
  width: '90%',
  maxWidth: '1100px'
};

const cardStyle = {
  background: '#282c34',
  padding: '30px',
  borderRadius: '15px',
  width: '280px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  border: '1px solid #444'
};

const avatarPlaceholder = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  background: '#444',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 15px auto',
  color: '#aaa',
  fontSize: '0.9rem',
  border: '3px solid #61dafb'
};

export default HomePage;