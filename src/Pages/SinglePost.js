import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SinglePost.css';
import { FaFacebook, FaTwitter, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  // Determine API base URL dynamically
  const API_BASE_URL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : `http://${window.location.hostname}:5000`;

  const FRONTEND_BASE_URL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : `http://${window.location.hostname}:3000`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${id}`); // Use API_BASE_URL here
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };

    fetchPost();
  }, [id, API_BASE_URL]);

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="single-post">
      {/* <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button> */}
      <h1 className="post-title">{post.title}</h1>
      <img
        src={`${API_BASE_URL}${post.image || '/uploads/placeholder.jpg'}`} // Use API_BASE_URL here
        alt={post.title}
        className="featured-image"
      />
      <div className="post-content">
        {post.content}
      </div>
      <div className="share-section">
        <h3>Share this post</h3>
        <div className="share-icons">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${FRONTEND_BASE_URL}/post/${post._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${FRONTEND_BASE_URL}/post/${post._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://wa.me/?text=${FRONTEND_BASE_URL}/post/${post._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
