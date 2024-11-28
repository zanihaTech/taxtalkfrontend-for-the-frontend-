import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SinglePost.css';
import { FaFacebook, FaTwitter, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="single-post">
      {/* <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button> */}
      <h1 className="post-title">{post.title}</h1>
      <img
        src={`http://localhost:5000${post.image || '/uploads/placeholder.jpg'}`}
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
            href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/post/${post._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=http://localhost:3000/post/${post._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://wa.me/?text=http://localhost:3000/post/${post._id}`}
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
