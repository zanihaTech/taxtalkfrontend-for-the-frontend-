import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [showCreatePostOverlay, setShowCreatePostOverlay] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [imagePreviewFile, setImagePreviewFile] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      setPosts(data);

      const likes = data.reduce((sum, post) => sum + (post.likes || 0), 0);
      setTotalLikes(likes);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('content', newPost.content);
    formData.append('imageFile', imagePreviewFile);

    const url = editingPost
      ? `http://localhost:5000/api/posts/${editingPost._id}`
      : 'http://localhost:5000/api/posts/create';
    const method = editingPost ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        fetchPosts();
        alert(editingPost ? 'Post updated successfully!' : 'Post created successfully!');
        handleCloseOverlay();
      } else {
        const errorMessage = await response.text();
        console.error('Failed to save post:', errorMessage);
        alert('Failed to save post.');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, PNG, and JPEG images are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB.');
      return;
    }

    setImagePreviewFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      content: post.content,
      image: post.image,
    });
    setImagePreview(post.image);
    setShowCreatePostOverlay(true);
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchPosts();
          alert('Post deleted successfully!');
        } else {
          const errorMessage = await response.text();
          console.error('Failed to delete post:', errorMessage);
          alert('Failed to delete post.');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleCloseOverlay = () => {
    setShowCreatePostOverlay(false);
    setEditingPost(null);
    setNewPost({ title: '', content: '', image: '' });
    setImagePreview('');
  };

  const renderCreatePost = () => (
    <div className="overlay">
      <div className="overlay-content">
        <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreatePost();
          }}
        >
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
              className="large-input"
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              required
              className="large-textarea"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" onChange={handleImageUpload} />
          </div>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
          <div className="form-buttons">
            <button type="submit" className="save-button">
              {editingPost ? 'Update Post' : 'Create Post'}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCloseOverlay}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/admin/login';
          }}
        >
          Logout
        </button>
      </header>

      <div className="stats-section">
        <div className="stat-card">
          <h3>Total Posts</h3>
          <p>{posts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Likes</h3>
          <p>{totalLikes}</p>
        </div>
      </div>

      <div className="post-management">
        <button
          className="add-post-button"
          onClick={() => setShowCreatePostOverlay(true)}
        >
          Add New Post
        </button>
      </div>

      {showCreatePostOverlay && renderCreatePost()}

      <table className="posts-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost:5000${post.image || '/uploads/placeholder.jpg'}`}
                  alt={post.title}
                  className="thumbnail-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/uploads/placeholder.jpg';
                  }}
                />
              </td>
              <td>{post.title}</td>
              <td>{post.author || 'Admin'}</td>
              <td>{post.likes}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditPost(post)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
