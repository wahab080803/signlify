import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const alphabetList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const LearningPage = () => {
  const lightBlue = "#61dafb";
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // 1. Logic for Scroll-to-Top Button Visibility
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

  // 2. Filter alphabet based on search
  const filteredAlphabet = alphabetList.filter(letter => 
    letter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App-header" style={{ justifyContent: 'flex-start', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Back Button */}
      <Link to="/dashboard" style={{ alignSelf: 'flex-start', marginLeft: '5%', color: lightBlue, textDecoration: 'none', marginTop: '30px' }}>
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

      {/* Dynamic Sections */}
      <div style={{ width: '100%' }}>
        {filteredAlphabet.length > 0 ? (
          filteredAlphabet.map((letter, index) => {
            const isEven = index % 2 === 0;
            const imagePath = require(`../assets/test1/${letter}_test.jpg`);

            return (
              <section key={letter} style={{ 
                display: 'flex', 
                flexDirection: isEven ? 'row' : 'row-reverse', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '80px 10%',
                backgroundColor: isEven ? 'transparent' : '#1c1e22',
                gap: '60px',
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: 1, textAlign: isEven ? 'right' : 'left', minWidth: '300px' }}>
                  <h2 style={{ fontSize: '6rem', color: lightBlue, margin: 0 }}>{letter}</h2>
                  <p style={{ fontSize: '1.5rem', color: '#ccc' }}>Sign for <b>{letter}</b></p>
                </div>

                <div style={{ flex: 1, display: 'flex', justifyContent: isEven ? 'flex-start' : 'flex-end', minWidth: '300px' }}>
                  <div style={imageContainerStyle}>
                    <img src={imagePath} alt={`ASL ${letter}`} style={{ width: '250px', borderRadius: '10px' }} />
                  </div>
                </div>
              </section>
            );
          })
        ) : (
          <p style={{ marginTop: '50px', color: '#666' }}>No characters match your search.</p>
        )}
      </div>

      {/* 3. Back to Top Button */}
      {showScrollBtn && (
        <button onClick={scrollToTop} style={scrollTopBtnStyle}>
          ↑
        </button>
      )}
    </div>
  );
};

// --- New Styles ---
const searchBarStyle = {
  width: '100%',
  padding: '15px 20px',
  borderRadius: '30px',
  border: '2px solid #444',
  background: '#1c1e22',
  color: 'white',
  fontSize: '1.1rem',
  outline: 'none',
  textAlign: 'center',
  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
  transition: 'border-color 0.3s'
};

const scrollTopBtnStyle = {
  position: 'fixed',
  bottom: '40px',
  right: '40px',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: '#61dafb',
  color: '#282c34',
  border: 'none',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
  zIndex: 1000
};

const imageContainerStyle = {
  padding: '15px', 
  background: '#282c34', 
  borderRadius: '20px', 
  border: '2px solid #61dafb',
  boxShadow: '0 15px 40px rgba(0,0,0,0.5)'
};

export default LearningPage;