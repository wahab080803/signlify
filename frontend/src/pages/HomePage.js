import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'; // Adjust path as needed
import wahabPic from '../assets/wahab.jpeg'; 
import irtazaPic from '../assets/irtaza.jpeg';

const HomePage = () => {
  const lightBlue = "#61dafb";

  return (
    <div className="App-header" style={{ 
      justifyContent: 'flex-start', 
      minHeight: '100vh', // Changed from height to minHeight
      scrollBehavior: 'smooth',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      overflowX: 'hidden' // Prevents horizontal scrollbars
    }}>
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
      <div style={{ display: 'flex', gap: '50px', marginTop: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* Author 1: Wahab */}
        <div style={{ textAlign: 'center' }}>
          <img 
            src={wahabPic} 
            alt="Abdul Wahab" 
            style={authorImageStyle} 
          />
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '10px' }}>Abdul Wahab</p>
          <p style={{ color: '#ccc' }}>FAST NUCES Lahore</p>
        </div>

        {/* Author 2: Irtaza */}
        <div style={{ textAlign: 'center' }}>
          <img 
            src={irtazaPic} 
            alt="Irtaza Sameel" 
            style={authorImageStyle} 
          />
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '10px' }}>Irtaza Sameel</p>
          <p style={{ color: '#ccc' }}>FAST NUCES Lahore</p>
        </div>

  </div>
</section>

      {/* 4. Location & Contact Section */}
      {/* Set width to 100% and ensure display is flex-column to stack title and content */}
      <section style={{ 
        padding: '80px 20px',
        textAlign: 'center',
        backgroundColor: '#1c1e22', 
        borderTop: '1px solid #444', 
        width: '100%', // Ensures the background color spans the full width
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <h2 style={{ color: lightBlue, marginBottom: '40px' }}>Visit Us</h2>
    
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '40px', 
          width: '100%', 
          maxWidth: '1100px' 
        }}>
          
          {/* Map Container */}
          <div style={{ borderRadius: '15px', overflow: 'hidden', border: `2px solid ${lightBlue}`, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <iframe 
              title="FAST NUCES Lahore Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.011894451036!2d74.30154087541604!3d31.468875374237517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901625902f901%3A0xe5435e16543ed24d!2sFAST%20NUCES%20Lahore!5e0!3m2!1sen!2spk!4v1715000000000!5m2!1sen!2spk" 
              width="450" 
              height="300" 
              style={{ border: 0, display: 'block' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

          {/* Contact Details */}
          <div style={{ textAlign: 'left', maxWidth: '400px' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'white' }}>
              <b>FAST NUCES</b> - National University of Computer and Emerging Sciences
            </p>
            <p style={{ marginBottom: '20px', color: '#ccc' }}>B-Block, Faisal Town, Lahore, Punjab</p>
            <div style={{ fontSize: '1rem', color: '#bbb', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <p>📞 <b>Contact:</b> +92 42 111 128 128</p>
              <p>📧 <b>Support:</b> support.signlify@fast.edu.pk</p>
            </div>
          </div>
          
        </div>
      </section>
      <Footer />
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

const authorImageStyle = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  objectFit: 'cover', // Ensures the photo doesn't look stretched
  border: `3px solid #61dafb`, // SignLify Light Blue border
  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
  transition: 'transform 0.3s ease'
};

export default HomePage;