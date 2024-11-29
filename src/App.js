import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPostsPage from './Pages/BlogPostsPage'; // Blog Posts Page
import SinglePost from './Pages/SinglePost'; // Single Post Page
import Login from './Pages/Login'; // Admin Login Page
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './ProtectedRoutes';
import Header from './components/Header/Header'; // Header Component
import HomePage from './Pages/Home'; // Import Home Page
import AboutPage from './Pages/About'; // Import About Page
import Footer from './components/Footer/Footer'; // Import Footer
import SearchResults from './components/SearchResults';


const App = () => {
  return (
    <Router>
      {/* Include Header */}
      <Header />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog-posts" element={<BlogPostsPage />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer is always displayed at the bottom */}
      <Footer />
    </Router>
  );
};

export default App;


