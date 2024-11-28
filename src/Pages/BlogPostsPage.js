import React from 'react';
import BlogList from '../components/BlogList/BlogList';
import TrendingSidebar from '../components/TrendingSidebar/TrendingSidebar';
import './BlogPostsPage.css';

const BlogPostsPage = () => {
  return (
    <div className="blog-posts-page-container">
      {/* Main Content Section */}
      <section className="main-blog-section">
        <div className="blog-list-container">
           <h1 className="blog-page-title">Latest Blog Posts</h1> 
          <BlogList />
        </div>
        
        {/* Sidebar Section */}
        <aside className="trending-sidebar-container">
          {/* <h2 className="sidebar-title">Trending Blogs</h2> */}
          <TrendingSidebar />
        </aside>
      </section>
    </div>
  );
};

export default BlogPostsPage;
