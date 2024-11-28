import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();  // Ensuring useNavigate is imported and used correctly

  const handleCreatePost = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author: 'Admin' }),
      });

      if (response.ok) {
        alert('Post created successfully!');
        console.log('Navigating to /blog-posts');  // Debugging log to confirm this line runs
        navigate('/blog-posts'); // Attempt to redirect to Blog Posts page
      } else {
        alert('Failed to create post.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
}

export default CreatePost;
