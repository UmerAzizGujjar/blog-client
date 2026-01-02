import { useState, useEffect } from 'react'
import './App.css'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Signup from './components/Signup'
import { authAPI, blogAPI } from './services/api'

/**
 * Main App Component - MERN Stack Blog Application
 * 
 * This is the parent component that manages the entire blog application.
 * It handles:
 * - User authentication (login/signup/logout)
 * - Fetching all blog posts from MongoDB
 * - Adding new posts
 * - Editing existing posts (author only)
 * - Deleting posts (author only)
 */
function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'
  
  // Blog state
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [viewingPost, setViewingPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  /**
   * useEffect hook to check if user is already logged in
   * Checks for token in localStorage on app load
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
    
    // Fetch all blogs regardless of auth status
    fetchBlogs();
  }, []);

  /**
   * Fetch all blogs from the backend
   */
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAllBlogs();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle user login
   */
  const handleLogin = async (credentials) => {
    const response = await authAPI.login(credentials);
    const { token, user } = response.data;
    
    // Save to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Update state
    setIsAuthenticated(true);
    setCurrentUser(user);
    
    // Refresh blogs
    fetchBlogs();
  };

  /**
   * Handle user signup
   */
  const handleSignup = async (userData) => {
    const response = await authAPI.signup(userData);
    const { token, user } = response.data;
    
    // Save to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Update state
    setIsAuthenticated(true);
    setCurrentUser(user);
    
    // Refresh blogs
    fetchBlogs();
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setEditingPost(null);
  };

  /**
   * Handle adding a new post or updating an existing one
   */
  const handleSubmit = async (postData) => {
    try {
      if (editingPost) {
        // UPDATE EXISTING POST
        await blogAPI.updateBlog(postData._id, postData);
        setEditingPost(null);
      } else {
        // ADD NEW POST
        await blogAPI.createBlog(postData);
      }
      
      // Close modal and refresh blogs
      setShowModal(false);
      fetchBlogs();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving post');
    }
  };

  /**
   * Handle editing a post
   */
  const handleEdit = (post) => {
    setEditingPost(post);
    setShowModal(true);
  };

  /**
   * Handle deleting a post
   */
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogAPI.deleteBlog(id);
        
        // Clear editing state if deleted post was being edited
        if (editingPost && editingPost._id === id) {
          setEditingPost(null);
        }
        
        // Refresh blogs
        fetchBlogs();
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting post');
      }
    }
  };

  /**
   * Handle liking/unliking a post
   */
  const handleLike = async (id) => {
    try {
      const response = await blogAPI.toggleLike(id);
      
      // Update the post in the list with new like data
      setPosts(posts.map(post => 
        post._id === id ? response.data : post
      ));
    } catch (error) {
      console.error('Error toggling like:', error);
      alert(error.response?.data?.message || 'Error updating like');
    }
  };

  /**
   * Handle viewing a post in full screen
   */
  const handleViewPost = (post) => {
    setViewingPost(post);
  };

  /**
   * Close the full screen view
   */
  const handleCloseView = () => {
    setViewingPost(null);
  };

  /**
   * Cancel editing mode
   */
  const handleCancelEdit = () => {
    setEditingPost(null);
    setShowModal(false);
  };

  /**
   * Open modal for creating new post
   */
  const handleCreateNew = () => {
    setEditingPost(null);
    setShowModal(true);
  };

  // Show login/signup page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="app">
        {authView === 'login' ? (
          <Login 
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthView('signup')}
          />
        ) : (
          <Signup 
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthView('login')}
          />
        )}
      </div>
    );
  }

  // Main app view for authenticated users
  return (
    <div className="app">
      {/* App Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>📝 BlogHub</h1>
            <p>Welcome back, <strong>{currentUser?.username}</strong>!</p>
          </div>
          <div className="header-right">
            <button onClick={handleCreateNew} className="btn btn-create">
              ➕ Post
            </button>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="app-container">
        {/* Loading state */}
        {loading ? (
          <div className="loading">Loading blogs...</div>
        ) : (
          /* Blog List Component to display all posts */
          <BlogList 
            posts={posts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onLike={handleLike}
            onViewPost={handleViewPost}
            currentUserId={currentUser?.id}
          />
        )}
      </div>

      {/* Modal for Create/Edit Post */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCancelEdit}>×</button>
            <BlogForm 
              onSubmit={handleSubmit}
              editingPost={editingPost}
              onCancelEdit={handleCancelEdit}
            />
          </div>
        </div>
      )}

      {/* Modal for Viewing Full Blog Post */}
      {viewingPost && (
        <div className="modal-overlay" onClick={handleCloseView}>
          <div className="modal-content blog-view-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseView}>×</button>
            <div className="blog-full-view">
              <h1>{viewingPost.title}</h1>
              <div className="blog-meta">
                <span className="blog-author">
                  {viewingPost.authorName}
                </span>
                <span className="blog-date">
                  {new Date(viewingPost.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="blog-full-content">
                {viewingPost.content}
              </div>
              <div className="blog-engagement">
                <button 
                  className={`btn btn-like ${viewingPost.isLikedByUser ? 'liked' : ''}`}
                  onClick={() => {
                    handleLike(viewingPost._id);
                    handleCloseView();
                  }}
                >
                  {viewingPost.isLikedByUser ? '❤️' : '🤍'} {viewingPost.likes || 0}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
