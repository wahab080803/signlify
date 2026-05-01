import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="nav-container">
      <Link to="/" className="footer-link">Home</Link>
    </footer>
  );
};

export default Footer;