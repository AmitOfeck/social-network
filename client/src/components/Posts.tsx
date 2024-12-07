import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../utils/postsUtils'; 
import SinglePost from './SinglePost';
import { CommentsProvider } from './contexts/CommentProvider';
import { usePosts } from './contexts/PostContext';
import '../css/Feed.css';

const Posts = () => {
  const { posts, setPosts } = usePosts(); 
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); 
  const [limit, setLimit] = useState(3); 
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const postsData = await fetchPosts(page, limit);
        if (page === 1) {
          setPosts(postsData.posts);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...postsData.posts]);
        }
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [page, limit]);

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1); 
  };

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div>
      {isLoading && (
        <div className="loading-banner">
          Loading posts...
        </div>
      )}

      <h2>All Posts</h2>
      <div>
        {posts.length === 0 && !isLoading ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
            <CommentsProvider key={post._id}>
              <SinglePost key={post._id} post={post} />
            </CommentsProvider>
          ))
        )}
      </div>
      <div className="load-more-container">
        <button
          className={`load-more-btn ${isLoading ? 'loading' : ''}`}
          onClick={loadMorePosts}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More Posts'}
        </button>
      </div>
    </div>
  );
};

export default Posts;
