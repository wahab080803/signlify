import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Create a local state for the username
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    // 1. Check if name is in location state (from login)
    const nameFromLogin = location.state?.username;
    
    // 2. Check if name is in Redux
    const nameFromRedux = user?.name;

    // 3. Check if we saved it in localStorage previously
    const savedName = localStorage.getItem('signlify_user');

    if (nameFromLogin) {
      setUserName(nameFromLogin);
      localStorage.setItem('signlify_user', nameFromLogin); // Save it!
    } else if (nameFromRedux) {
      setUserName(nameFromRedux);
    } else if (savedName) {
      setUserName(savedName);
    }
  }, [location.state, user]);

  const handleLogout = () => {
    localStorage.removeItem('signlify_user'); // Clear on logout
    navigate('/');
  };

  return (
    <div className="App-header" style={{ position: 'relative', justifyContent: 'flex-start', paddingTop: '60px' }}>
      
      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        style={logoutButtonStyle}
        onMouseOver={(e) => {
            e.currentTarget.style.background = '#ff4b2b';
            e.currentTarget.style.color = 'white';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#ff4b2b';
        }}
      >
        Logout
      </button>

      <h1 style={{ marginBottom: '10px' }}>Dashboard</h1>
      <p style={{ color: '#61dafb', fontSize: '1.5rem', marginBottom: '40px' }}>
        Welcome back, <span style={{ fontWeight: 'bold' }}>{userName}</span>!
      </p>

      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        justifyContent: 'center', 
        flexWrap: 'wrap',
        width: '80%' 
      }}>
        {/* Learning Card */}
        <Link 
          to="/learning" 
          style={cardStyle}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📚</div>
          <h3 style={{ margin: '0', color: '#61dafb' }}>Learning Mode</h3>
          <p style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '10px' }}>Practice your sign language skills and master ASL.</p>
        </Link>

        {/* Prediction Card */}
        <Link 
          to="/prediction" 
          style={cardStyle}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🤟</div>
          <h3 style={{ margin: '0', color: '#61dafb' }}>Real-time Prediction</h3>
          <p style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '10px' }}>Translate signs to text in real-time using our AI engine.</p>
        </Link>
      </div>
    </div>
  );
};

// ... (Keep your existing styles below)
const logoutButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '40px',
  background: 'transparent',
  border: '1px solid #ff4b2b',
  color: '#ff4b2b',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s'
};

const cardStyle = {
  backgroundColor: '#1c1e22',
  border: '1px solid #444',
  borderRadius: '15px',
  padding: '40px 30px',
  width: '250px',
  textDecoration: 'none',
  color: 'white',
  transition: 'transform 0.2s, border-color 0.2s',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
};

export default DashboardPage;