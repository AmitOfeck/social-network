// src/components/Feed.js
import React from 'react';
import CreatePost from './CreatePost';
import Posts from './Posts';

const Feed = () => {
  return (
    <div className="feed">
      <CreatePost />
      <Posts />
    </div>
  );
};

export default Feed;
