import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaShareAlt, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './BlogList.css';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      console.log('Fetched Posts for Blog List:', data);
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleLike = async (id) => {
    try {
      console.log('Liking Post:', id);
      const response = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
        method: 'PUT',
      });
      if (response.ok) {
        console.log('Post liked successfully:', id);
        fetchPosts();
      } else {
        console.error('Error liking post:', response.statusText);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const toggleDropdown = (id) => {
    console.log('Toggling dropdown for post:', id);
    setDropdownVisible((prev) => (prev === id ? null : id));
  };

  const handleReadMore = (id) => {
    console.log('Read More clicked for post:', id);
    navigate(`/post/${id}`);
  };

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post._id} className="blog-card">
          <div className="image-container">
          <img
  src={`http://localhost:5000${post.image || '/uploads/placeholder.jpg'}`}
  alt={post.title}
  className="thumbnail-img"
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = '/uploads/placeholder.jpg'; // Use placeholder if image fails
  }}
/>




          </div>

          <div className="post-content">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-snippet">{post.content.substring(0, 100)}...</p>
            <div className="post-meta">
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="post-actions">
              <button className="action-button" onClick={() => handleLike(post._id)}>
                <FaThumbsUp /> Like ({post.likes || 0})
              </button>

              <button className="action-button" onClick={() => toggleDropdown(post._id)}>
                <FaShareAlt /> Share
              </button>

              {dropdownVisible === post._id && (
                <div className="share-dropdown">
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=http://localhost:3000/post/${post._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook /> Facebook
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram /> Instagram
                  </a>
                  <a
                    href={`https://wa.me/?text=http://localhost:3000/post/${post._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                </div>
              )}

              <button className="read-more-button" onClick={() => handleReadMore(post._id)}>
                Read More
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
