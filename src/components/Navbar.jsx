import React from 'react';
import { TreePine } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <TreePine className="logo-icon" size={28} />
          <span className="logo-text">AgroSupport</span>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link">Home</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
