import React from 'react';
import './About.css'; // Add custom styles for About section

const About = () => {
  return (
    <div className="about-section">
      {/* Background Section */}
      <div className="about-header">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">
          Empowering you with financial insights, tax tips, and economic updates.
        </p>
      </div>

      {/* Main Content */}
      <div className="about-content">
        {/* Introduction */}
        <div className="about-intro">
          <h2>Who We Are</h2>
          <p>
            At TaxTalk India, we are committed to bringing you the latest insights in
            finance, taxes, and economic updates. Our mission is to simplify complex
            financial topics and empower individuals and businesses with actionable knowledge.
          </p>
        </div>

        {/* Core Values */}
        <div className="about-values">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Integrity</h3>
              <p>We ensure accuracy and reliability in every piece of information shared.</p>
            </div>
            <div className="value-card">
              <h3>Clarity</h3>
              <p>Making complex financial topics simple and accessible for everyone.</p>
            </div>
            <div className="value-card">
              <h3>Empowerment</h3>
              <p>Helping individuals and businesses make informed financial decisions.</p>
            </div>
          </div>
        </div>

        {/* Team Showcase */}
        <div className="about-team">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="Team Member" />
              <h4>John Doe</h4>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="Team Member" />
              <h4>Jane Smith</h4>
              <p>Tax Expert</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="Team Member" />
              <h4>Ali Khan</h4>
              <p>Financial Analyst</p>
            </div>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="about-cta">
          <h2>Join Us</h2>
          <p>
            Explore our blog, stay updated, and make the best financial decisions.
          </p>
          <button className="explore-btn">Explore Blogs</button>
        </div>
      </div>
    </div>
  );
};

export default About;
