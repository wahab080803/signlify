import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const lightBlue = "#61dafb";

  return (
    <div className="App-header" style={{ justifyContent: 'flex-start', minHeight: '100vh', paddingTop: '40px' }}>
      {/* Back to Home */}
      <Link to="/" style={{ alignSelf: 'flex-start', marginLeft: '5%', color: lightBlue, textDecoration: 'none', marginBottom: '20px' }}>
        ← Back to Home
      </Link>

      <h1 style={{ color: lightBlue }}>SignLify Research Blog</h1>
      <p style={{ maxWidth: '800px', textAlign: 'center', opacity: 0.8, marginBottom: '50px' }}>
        Documenting our journey in developing real-time Sign-to-Text translation using Transformers and MediaPipe.
      </p>

      {/* Blog Post Placeholder */}
      <div style={blogCardStyle}>
        <h2 style={{ color: lightBlue }}>Implementing the Sign Transformer</h2>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>Published: May 2026 • By Wahab</p>
        <p style={{ lineHeight: '1.6' }}>
          In this post, we dive deep into how we used 60-frame buffers and positional encoding 
          to translate continuous signs into full words...
        </p>
        <button style={readMoreBtn}>Read More</button>
      </div>

      <div style={{ marginTop: '50px', color: '#666' }}>
        <p>More technical articles coming soon!</p>
      </div>
    </div>
  );
};

const blogCardStyle = {
  background: '#1c1e22',
  padding: '30px',
  borderRadius: '15px',
  width: '90%',
  maxWidth: '800px',
  textAlign: 'left',
  border: '1px solid #444',
  marginBottom: '30px'
};

const readMoreBtn = {
  background: 'transparent',
  border: '1px solid #61dafb',
  color: '#61dafb',
  padding: '8px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '15px'
};

export default BlogPage;