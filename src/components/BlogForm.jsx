import React, { useState, useEffect } from 'react';

/**
 * BlogForm Component
 * 
 * This component provides a form to add or edit blog posts.
 * It uses controlled inputs (value stored in state).
 * 
 * Props:
 * - onSubmit: Function to handle form submission (add or update post)
 * - editingPost: Object containing the post being edited (null if adding new post)
 * - onCancelEdit: Function to cancel editing mode
 */
function BlogForm({ onSubmit, editingPost, onCancelEdit }) {
  // State for controlled form inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * useEffect hook to populate form when editing a post
   * This runs whenever editingPost changes
   */
  useEffect(() => {
    if (editingPost) {
      // If we're editing, populate the form with existing data
      setTitle(editingPost.title);
      setContent(editingPost.content);
    } else {
      // If not editing, clear the form
      setTitle('');
      setContent('');
    }
  }, [editingPost]); // Dependency array - runs when editingPost changes

  /**
   * Handle form submission
   * Prevents default form behavior and calls the onSubmit prop
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Validate that both fields are filled
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content!');
      return;
    }

    // Create post object to submit
    const postData = {
      title: title.trim(),
      content: content.trim(),
    };

    // If editing, include the post id
    if (editingPost) {
      postData._id = editingPost._id;
    }

    setLoading(true);
    try {
      // Call the onSubmit function passed from parent
      await onSubmit(postData);

      // Clear form after successful submission
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-form-container">
      <h2>{editingPost ? '✏️ Edit Blog Post' : '✨ Create New Blog Post'}</h2>
      
      <form className="blog-form" onSubmit={handleSubmit}>
        {/* Title Input - Controlled Component */}
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter blog post title..."
            value={title}  // Controlled input - value comes from state
            onChange={(e) => setTitle(e.target.value)}  // Update state on change
            disabled={loading}
          />
        </div>

        {/* Content Textarea - Controlled Component */}
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            placeholder="Write your blog content here..."
            rows="6"
            value={content}  // Controlled input - value comes from state
            onChange={(e) => setContent(e.target.value)}  // Update state on change
            disabled={loading}
          />
        </div>

        {/* Form Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (editingPost ? 'Update Post' : 'Add Post')}
          </button>
          
          {/* Show cancel button only when editing */}
          {editingPost && (
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancelEdit}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
