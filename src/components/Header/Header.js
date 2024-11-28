import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    } else {
      alert('Please enter a search term.');
    }
  };
  
  

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-text">
            Tax<span className="logo-highlight">Talk</span>.India
          </span>
        </Link>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/blog-posts" onClick={toggleMenu}>Blog Posts</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          {/* <Link to="/contact" onClick={toggleMenu}>Contact</Link> */}
        </nav>

        {/* Search Form */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        {/* Admin Login */}
        <div className="admin-login">
          <Link to="/admin/login">
            <button className="admin-login-btn">Admin Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
