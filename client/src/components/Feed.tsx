import React from 'react';
import CreatePost from './CreatePost';
import Posts from './Posts';
import { PostProvider } from './contexts/PostContext';

const Feed = () => {
  return (
    <PostProvider>
       <div className="feed">
          <CreatePost />
          <Posts />
       </div>
    </PostProvider>
  );
};

export default Feed;
