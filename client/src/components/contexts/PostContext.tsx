import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Post {
  _id: string;
  authorId: string; 
  content: string;
  date: string;
  likesCount: number;
  commentCount: number;
  photoUrl?: string;  
}

interface PostContextProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  addPost: (post: Post) => void;
  deletePostFromContext: (postId: string) => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); 
  };

  const deletePostFromContext = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, addPost , deletePostFromContext }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};
