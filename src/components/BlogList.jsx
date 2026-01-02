import React from 'react';
import BlogItem from './BlogItem';

/**
 * BlogList Component
 * 
 * This component renders a list of all blog posts.
 * It maps through the posts array and renders a BlogItem for each post.
 * 
 * Props:
 * - posts: Array of blog post objects
 * - onEdit: Function to handle editing a post (passed down to BlogItem)
 * - onDelete: Function to handle deleting a post (passed down to BlogItem)
 * - onLike: Function to handle liking a post (passed down to BlogItem)
 * - onViewPost: Function to handle viewing a post in full screen
 * - currentUserId: ID of currently logged in user
 */
function BlogList({ posts, onEdit, onDelete, onLike, onViewPost, currentUserId }) {
  // If there are no posts, show a message to the user
  if (posts.length === 0) {
    return (
      <div className="blog-list-empty">
        <p>No blog posts yet. Be the first to create one!</p>
      </div>
    );
  }

  // Sort posts by number of likes (highest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const likesA = a.likes || 0;
    const likesB = b.likes || 0;
    return likesB - likesA;
  });

  return (
    <div className="blog-list">
      {/* Map through all posts and render a BlogItem for each one */}
      {sortedPosts.map((post) => (
        <BlogItem
          key={post._id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
          onLike={onLike}
          onViewPost={onViewPost}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}

export default BlogList;
