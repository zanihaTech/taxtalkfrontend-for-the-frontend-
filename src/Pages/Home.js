import React from 'react';
import { useNavigate } from 'react-router-dom';
import TrendingCarousel from '../components/TrendingCarousel/TrendingCarousel';
import './Home.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleExploreBlogs = () => {
    navigate('/blog-posts');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to TaxTalk India</h1>
          <p>Your trusted partner for financial insights, tax tips, and economic updates.</p>
          <button className="cta-btn" onClick={handleExploreBlogs}>
            Explore Blogs
          </button>
        </div>
      </section>

      {/* Trending Blogs */}
      <section className="trending-section">
        <TrendingCarousel />
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About TaxTalk India</h2>
        <p>
          At TaxTalk India, we aim to simplify finance and empower individuals 
          and businesses with actionable knowledge. Join thousands of readers 
          to stay ahead in the financial game.
        </p>
        <button className="cta-btn" onClick={handleExploreBlogs}>
          Explore Blogs
        </button>
      </section>
    </div>
  );
};

export default HomePage;
