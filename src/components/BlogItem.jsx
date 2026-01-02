import React from 'react';

/**
 * BlogItem Component
 * 
 * This component displays a single blog post with its title and content.
 * It also provides Edit and Delete buttons.
 * 
 * Props:
 * - post: Object containing id, title, content, author info of the blog post
 * - onEdit: Function to handle editing the post
 * - onDelete: Function to handle deleting the post
 * - onLike: Function to handle liking the post
 * - onViewPost: Function to handle viewing the post in full screen
 * - currentUserId: ID of the currently logged in user
 */
function BlogItem({ post, onEdit, onDelete, onLike, onViewPost, currentUserId }) {
  // Check if current user is the author of this post
  const isAuthor = currentUserId && (
    String(post.author) === String(currentUserId) ||
    String(post.author?._id) === String(currentUserId)
  );

  // Handle clicks on the card (but not on buttons)
  const handleCardClick = (e) => {
    // Only open full view if clicking on the card itself, not buttons
    if (!e.target.closest('button')) {
      onViewPost(post);
    }
  };

  return (
    <div 
      className={`blog-item ${isAuthor ? 'my-post' : ''}`}
      onClick={handleCardClick}
    >
      {/* Display the blog post title */}
      <h3>{post.title}</h3>
      
      {/* Display author name and date */}
      <div className="blog-meta">
        <span className="blog-author">
          {post.authorName}
          {isAuthor && <span className="badge-me">You</span>}
        </span>
        <span className="blog-date">
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>
      
      {/* Display the blog post content */}
      <p className="blog-content">{post.content}</p>
      
      {/* Like button - visible to everyone */}
      <div className="blog-engagement">
        <button 
          className={`btn btn-like ${post.isLikedByUser ? 'liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onLike && onLike(post._id);
          }}
        >
          {post.isLikedByUser ? '❤️' : '🤍'} {post.likes || 0}
        </button>
      </div>
      
      {/* Action buttons - Only visible to post author */}
      {isAuthor && (
        <div className="blog-item-actions">
          <button 
            className="btn btn-edit" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(post);
            }}
          >
            ✏️ Edit
          </button>
          
          <button 
            className="btn btn-delete" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(post._id);
            }}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogItem;
