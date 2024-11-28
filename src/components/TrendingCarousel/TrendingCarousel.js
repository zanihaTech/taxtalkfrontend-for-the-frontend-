import React, { useEffect, useState } from 'react';
import './TrendingCarousel.css';

const TrendingCarousel = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  const fetchTrendingPosts = async () => {
    try {
      const response = await fetch('http://192.168.1.4:5000/api/posts/trending');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTrendingPosts(data);
    } catch (error) {
      console.error('Failed to fetch trending posts:', error);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? trendingPosts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === trendingPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-Slide Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === trendingPosts.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [trendingPosts.length]);

  if (!trendingPosts.length) {
    return <div className="trending-carousel">No trending posts available.</div>;
  }

  const currentPost = trendingPosts[currentIndex];

  return (
    <div className="trending-carousel-container">
      <h2 className="trending-heading">TRENDING BLOGS</h2>
      <div className="trending-carousel">
        <button className="carousel-btn prev-btn" onClick={handlePrev}>
          ❮
        </button>
        <div className="carousel-content">
          <img
            src={`http://192.168.1.4:5000${currentPost.image || '/uploads/placeholder.jpg'}`}
            alt={currentPost.title}
            className="carousel-image"
          />

          <h3 className="carousel-title">{currentPost.title}</h3>
          <p className="carousel-likes">{currentPost.likes} Likes</p>
        </div>
        <button className="carousel-btn next-btn" onClick={handleNext}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default TrendingCarousel;
