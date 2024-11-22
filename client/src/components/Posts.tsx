import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../utils/postsUtils'; 
import SinglePost from './SinglePost';

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]); 
  const [error, setError] = useState<string>(''); 

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData); 
      } catch (err) {
        setError('Failed to fetch posts'); 
      }
    };

    getPosts();
  }, []); 

  if (error) {
    return <div>{error}</div>; 
  }

  return (
      <div>
      <h2>All Posts</h2>
      <div>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
            <SinglePost key={post._id} post={post} /> 
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
