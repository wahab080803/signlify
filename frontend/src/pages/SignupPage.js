import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { signup } from '../redux/actions/authActions';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigation hook[cite: 2]

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Dispatch the signup action to Redux
      await dispatch(signup({ name, email, password }));
      
      // 2. Provide feedback to the user
      console.log("Signup action dispatched for:", email);
      
      // 3. Redirect to login or dashboard after successful click
      // In a real app, you might wait for a success response from the server first
      alert("Registration successful! Redirecting to login...");
      navigate('/login'); 
      
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Something went wrong. Please check your connection.");
    }
  };

  return (
    <div className="App-header"> {/* Dark background and centering[cite: 1] */}
      <h2>Sign Up</h2>
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
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {/* Navigation link to go back to Login[cite: 5, 7] */}
      <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
        Already have an account?{' '}
        <Link to="/login" className="App-link">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;