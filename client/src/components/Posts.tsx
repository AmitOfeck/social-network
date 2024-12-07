import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../utils/postsUtils';
import SinglePost from './SinglePost';
import { CommentsProvider } from './contexts/CommentProvider';
import { usePosts } from './contexts/PostContext';
import '../css/Feed.css';

const Posts = () => {
  const { posts, setPosts } = usePosts();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [hasFetchedInitialPosts, setHasFetchedInitialPosts] = useState<boolean>(false);

  const limit = 3;

  useEffect(() => {
    const loadInitialPosts = async () => {
      setIsLoading(true);
      try {
        const postsData = await fetchPosts(0, limit);
        setPosts(postsData.posts);
        setTotalPosts(postsData.totalPosts);
        setHasFetchedInitialPosts(true);
      } catch (error) {
        console.error('Error fetching initial posts');
        setError('Failed to fetch posts');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialPosts();
  }, []);

  const loadMorePosts = async () => {
    if (posts.length >= totalPosts) return;

    setIsLoading(true);

    try {
      const newSkip = posts.length; 
      const newPostsData = await fetchPosts(newSkip, limit);
      setPosts((prevPosts) => [...prevPosts, ...newPostsData.posts]);
    } catch (error) {
      console.error('Error loading more posts');
    } finally {
      setIsLoading(false);
    }
  };

  const isDisableButton = posts.length >= totalPosts; 

  if (error) {
    return <div>{error}</div>;
  }

  if (!hasFetchedInitialPosts) {
    return <p>Loading posts...</p>;
  }

  return (
    <div>
      {isLoading && (
        <div className="loading-banner">Loading posts...</div>
      )}

      <h2>All Posts</h2>
      <div>
        {posts.length === 0 && !isLoading ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
            <CommentsProvider key={post._id}>
              <SinglePost post={post} />
            </CommentsProvider>
          ))
        )}
      </div>
      <div className="load-more-container">
        <button
          className={`load-more-btn ${isLoading ? 'loading' : ''}`}
          onClick={loadMorePosts}
          disabled={isDisableButton || isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More Posts'}
        </button>
      </div>
    </div>
  );
};

export default Posts;
