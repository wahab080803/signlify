import React from 'react';
import { Link } from 'react-router-dom';

const SupportPage = () => {
  const lightBlue = "#61dafb";

  const faqs = [
    { 
      q: "Why is the camera not loading?", 
      a: "Ensure you have granted browser permissions for the webcam. If you are on a mobile device, make sure no other app is using the camera." 
    },
    { 
      q: "The AI isn't predicting anything. What's wrong?", 
      a: "Check if the FastAPI backend is running on port 8000. Look for the 'Connected' status in the dashboard." 
    },
    { 
      q: "How many signs does SignLify support?", 
      a: "Currently, we support common characters and a specific set of words using our Sign Transformer model. We are constantly expanding the library." 
    }
  ];

  return (
    <div className="App-header" style={{ justifyContent: 'flex-start', minHeight: '100vh', paddingTop: '40px' }}>
      <Link to="/" style={{ alignSelf: 'flex-start', marginLeft: '5%', color: lightBlue, textDecoration: 'none', marginBottom: '20px' }}>
        ← Back to Home
      </Link>

      <h1 style={{ color: lightBlue }}>Support Center</h1>
      <p style={{ opacity: 0.8, marginBottom: '50px' }}>Need help with SignLify? We are here to assist you.</p>

      {/* FAQ Section */}
      <div style={{ width: '90%', maxWidth: '800px', marginBottom: '60px' }}>
        <h2 style={{ borderBottom: '1px solid #444', paddingBottom: '10px' }}>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} style={faqBoxStyle}>
            <h4 style={{ color: lightBlue, margin: '0 0 10px 0' }}>Q: {faq.q}</h4>
            <p style={{ fontSize: '0.95rem', color: '#ccc', margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Contact Form Placeholder */}
      <div style={contactCardStyle}>
        <h2 style={{ marginBottom: '20px' }}>Contact the Developers</h2>
        <input type="text" placeholder="Your Name" style={inputStyle} />
        <input type="email" placeholder="Your Email" style={inputStyle} />
        <textarea placeholder="Describe your issue..." style={{ ...inputStyle, height: '120px' }}></textarea>
        <button style={submitBtnStyle}>Send Message</button>
      </div>

      <div style={{ marginTop: '40px', fontSize: '0.9rem', color: '#666' }}>
        <p>Email: support.signlify@fast.edu.pk</p>
      </div>
    </div>
  );
};

// --- Styles ---

const faqBoxStyle = {
  background: '#1c1e22',
  padding: '20px',
  borderRadius: '10px',
  marginTop: '20px',
  textAlign: 'left',
  borderLeft: '4px solid #61dafb'
};

const contactCardStyle = {
  background: '#16181d',
  padding: '40px',
  borderRadius: '20px',
  width: '90%',
  maxWidth: '600px',
  border: '1px solid #333',
  textAlign: 'center'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  borderRadius: '8px',
  border: '1px solid #444',
  background: '#282c34',
  color: 'white',
  outline: 'none',
  boxSizing: 'border-box'
};

const submitBtnStyle = {
  background: '#61dafb',
  color: '#282c34',
  border: 'none',
  padding: '12px 30px',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem'
};

export default SupportPage;