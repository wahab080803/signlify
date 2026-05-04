import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/authActions';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Dispatch the login action to Redux
      await dispatch(login({ email, password }));
      
      // 2. Extract username for the dynamic "Welcome back" greeting
      // Splits "wahab@gmail.com" to just "wahab"
      const username = email.split('@')[0];
      
      // 3. Log for debugging
      console.log("Login successful for:", username);
      
      // 4. Redirect to Dashboard, passing the username in the state
      navigate('/dashboard', { state: { username: username } }); 
      
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials or server error. Please try again.");
    }
  };

  return (
    // position: 'relative' ensures the absolute-positioned Home icon stays inside this div
    <div className="App-header" style={{ position: 'relative' }}> 
      
      {/* Home Button SVG - Styled with SignLify Light Blue */}
      <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', transition: 'transform 0.2s' }}>
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
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </Link>

      <h2 style={{ marginBottom: '20px' }}>Login to <span style={{ color: '#61dafb' }}>SignLify</span></h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={loginButtonStyle}>Login</button>
      </form>

      <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
        Don't have an account?{' '}
        <Link to="/signup" className="App-link">
          Sign Up here
        </Link>
      </p>
    </div>
  );
};

// Simple styles to keep the form clean
const inputStyle = {
  padding: '12px',
  borderRadius: '5px',
  border: '1px solid #444',
  background: '#282c34',
  color: 'white',
  width: '250px'
};

const loginButtonStyle = {
  padding: '10px 30px',
  background: '#61dafb',
  color: '#282c34',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem'
};

export default LoginPage;