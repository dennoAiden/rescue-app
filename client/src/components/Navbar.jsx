import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <AlertTriangle className="navbar-icon" />
          <h1 className="navbar-title">Zusha!</h1>
        </div>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/services" className="navbar-link">Services</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">About</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  ); 
}

export default Navbar;
