import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Get username from navigation state (passed from Login) or fallback to Redux/User
  const userName = location.state?.username || user?.name || 'User';

  // 2. Handle Logout to return to Homepage
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="App-header" style={{ position: 'relative', justifyContent: 'flex-start', paddingTop: '60px' }}>
      
      {/* Logout Button at Top Right */}
      <button 
        onClick={handleLogout} 
        style={logoutButtonStyle}
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

// Logout button style
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

// Card style object
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