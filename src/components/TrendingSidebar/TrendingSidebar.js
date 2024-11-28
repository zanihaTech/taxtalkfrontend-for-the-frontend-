import React, { useEffect, useState } from 'react';
import '../../components/TrendingSidebar/ TrendingSidebar.css';

const TrendingSidebar = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

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

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">🔥 Trending Blogs</h2>
      {trendingPosts.length > 0 ? (
        trendingPosts.map((post) => {
          const imageUrl = post.image
            ? `http://192.168.1.4:5000${post.image}` // Properly prefix the image URL
            : 'https://via.placeholder.com/50'; // Fallback image if not available

          return (
            <div key={post._id} className="trending-card">
              <img
                src={imageUrl} // Use the updated image URL
                alt={post.title}
                className="trending-img"
              />
              <div className="trending-content">
                <span className="trending-title">{post.title}</span>
                <span className="trending-likes">{post.likes} Likes</span>
              </div>
            </div>
          );
        })
      ) : (
        <p className="no-trending-message">No trending blogs available</p>
      )}
    </div>
  );
};

export default TrendingSidebar;
