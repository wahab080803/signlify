import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const alphabetList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const LearningPage = () => {
  const lightBlue = "#61dafb";
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // 1. Handle scroll visibility for the 'Back to Top' button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Filter alphabet based on search input
  const filteredAlphabet = alphabetList.filter(letter => 
    letter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App-header" style={{ justifyContent: 'flex-start', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Back Button */}
      <Link to="/dashboard" style={backLinkStyle}>
        ← Back to Dashboard
      </Link>

      <h1 style={{ color: lightBlue, fontSize: '3rem', marginBottom: '10px' }}>Learning Mode</h1>
      
      {/* Search Bar Section */}
      <div style={{ marginBottom: '40px', width: '90%', maxWidth: '500px' }}>
        <input 
          type="text" 
          placeholder="Search for a character (e.g. 'A')..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchBarStyle}
        />
      </div>

      {/* Alphabet Sections */}
      <div style={{ width: '100%' }}>
        {filteredAlphabet.length > 0 ? (
          filteredAlphabet.map((letter, index) => {
            const isEven = index % 2 === 0;
            // Dynamic image loading
            const imagePath = require(`../assets/test1/${letter}_test.jpg`);

            return (
              <section key={letter} style={{ 
                ...sectionStyle, 
                flexDirection: isEven ? 'row' : 'row-reverse',
                backgroundColor: isEven ? 'transparent' : '#1c1e22',
              }}>
                
                {/* Text Content */}
                <div style={{ flex: 1, textAlign: isEven ? 'right' : 'left', minWidth: '250px' }}>
                  <h2 style={{ fontSize: '6.5rem', color: lightBlue, margin: 0, lineHeight: '1' }}>{letter}</h2>
                  <p style={{ fontSize: '1.5rem', color: '#ccc' }}>Sign for <b>{letter}</b></p>
                </div>

                {/* Flow Arrow (Points from Letter to Image) */}
                <div style={{ 
                    fontSize: '4rem', 
                    color: '#444', 
                    userSelect: 'none',
                    transform: isEven ? 'rotate(0deg)' : 'rotate(180deg)',
                    transition: '0.3s',
                    padding: '0 20px'
                }}>
                  ➞
                </div>

                {/* Sign Image */}
                <div style={{ flex: 1, display: 'flex', justifyContent: isEven ? 'flex-start' : 'flex-end', minWidth: '300px' }}>
                  <div style={imageContainerStyle}>
                    <img src={imagePath} alt={`ASL ${letter}`} style={{ width: '260px', borderRadius: '10px' }} />
                  </div>
                </div>

              </section>
            );
          })
        ) : (
          <p style={{ marginTop: '50px', color: '#666', fontSize: '1.2rem' }}>No characters match your search.</p>
        )}
      </div>

      {/* Floating Scroll to Top Arrow Button */}
      {showScrollBtn && (
        <button 
          onClick={scrollToTop} 
          style={scrollTopBtnStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = lightBlue;
            e.currentTarget.style.transform = 'translateY(0) scale(1.0)';
          }}
        >
          ▲
        </button>
      )}

      {/* CSS Hover Effects for global classes */}
      <style>
        {`
          input::placeholder { color: #555; }
          input:focus { border-color: #61dafb !important; box-shadow: 0 0 10px rgba(97, 218, 251, 0.3) !important; }
        `}
      </style>
    </div>
  );
};

// --- Styles ---

const backLinkStyle = {
  alignSelf: 'flex-start', 
  marginLeft: '5%', 
  color: '#61dafb', 
  textDecoration: 'none', 
  marginTop: '30px',
  fontSize: '1.1rem',
  fontWeight: 'bold'
};

const searchBarStyle = {
  width: '100%',
  padding: '15px 25px',
  borderRadius: '35px',
  border: '2px solid #333',
  background: '#16181d',
  color: 'white',
  fontSize: '1.1rem',
  outline: 'none',
  textAlign: 'center',
  boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
  transition: 'all 0.3s ease'
};

const sectionStyle = {
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  padding: '100px 10%',
  gap: '30px',
  flexWrap: 'wrap',
  transition: 'background-color 0.5s ease'
};

const imageContainerStyle = {
  padding: '18px', 
  background: '#22262e', 
  borderRadius: '25px', 
  border: '2px solid #61dafb',
  boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
};

const scrollTopBtnStyle = {
  position: 'fixed',
  bottom: '50px',
  right: '50px',
  width: '65px',
  height: '65px',
  borderRadius: '50%',
  backgroundColor: '#61dafb',
  color: '#1c1e22',
  border: 'none',
  fontSize: '1.8rem',
  cursor: 'pointer',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  zIndex: 1000,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default LearningPage;