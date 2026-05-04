import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const lightBlue = "#61dafb";

  return (
    <footer style={footerWrapperStyle}>
      <div style={footerTopStyle}>
        {/* Brand & Socials */}
        <div style={{ flex: 1, minWidth: '280px', textAlign: 'left' }}>
          <h2 style={{ color: lightBlue, margin: '0 0 10px 0' }}>SignLify</h2>
          <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
            Breaking communication barriers through advanced AI. Developed as a 
            Final Year Project at FAST NUCES Lahore.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {socialIcons.map((icon, index) => (
              <a key={index} href={icon.link} target="_blank" rel="noreferrer" style={socialIconStyle} title={icon.name}>
                {icon.svg}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={footerLinksRowStyle}>
        {/* Resources - Public facing pages */}
        <div style={linkColumnStyle}>
          <h4 style={{ color: 'white', marginBottom: '15px' }}>Resources</h4>
          <Link to="/guide-on-asl" style={footerLinkStyle}>Guide on ASL</Link>
          <Link to="/blog" style={footerLinkStyle}>Research Blog</Link>
          <Link to="/support" style={footerLinkStyle}>Support Center</Link>
        </div>

        {/* Authors - Linked to a future authors page */}
        <div style={linkColumnStyle}>
          <h4 style={{ color: 'white', marginBottom: '15px' }}>Authors</h4>
          <Link to="/authors" style={footerLinkStyle}>Meet the Team</Link>
          <a href="https://github.com/wahab080803" target="_blank" rel="noreferrer" style={footerLinkStyle}>GitHub Profile</a>
          <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '5px' }}>FAST NUCES Lahore</p>
        </div>
      </div>

      <div style={footerBottomStyle}>
        <p>© 2026 SignLify Project. All Rights Reserved. Built with React & FastAPI.</p>
      </div>
    </footer>
  );
};

// --- Styles ---
const footerWrapperStyle = { backgroundColor: '#1c1e22', borderTop: '1px solid #444', width: '100%', padding: '50px 0 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' };
const footerTopStyle = { display: 'flex', justifyContent: 'space-between', width: '85%', maxWidth: '1100px', flexWrap: 'wrap', gap: '40px' };
const mapContainerStyle = { flex: 0.8, minWidth: '280px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #444' };
const footerLinksRowStyle = { display: 'flex', justifyContent: 'space-between', width: '85%', maxWidth: '1100px', marginTop: '40px', borderTop: '1px solid #333', paddingTop: '30px', flexWrap: 'wrap', gap: '30px' };
const linkColumnStyle = { display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: '150px' };
const footerLinkStyle = { color: '#bbb', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '10px', transition: 'color 0.3s' };
const footerBottomStyle = { marginTop: '40px', borderTop: '1px solid #222', width: '100%', textAlign: 'center', paddingTop: '20px', color: '#555', fontSize: '0.75rem' };
const socialIconStyle = { width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#333', transition: 'background 0.3s' };

// --- Social Icons Data ---
const socialIcons = [
  { name: "GitHub", link: "https://github.com/wahab080803", svg: <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
  { name: "Facebook", link: "https://facebook.com", svg: <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg> },
  { name: "Instagram", link: "https://instagram.com", svg: <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { name: "LinkedIn", link: "https://linkedin.com", svg: <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg> }
];

export default Footer;