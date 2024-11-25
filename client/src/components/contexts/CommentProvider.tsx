import React, { createContext, useContext, useState } from 'react';

interface Comment {
  _id: string;
  authorId: string;
  content: string;
  date: string;
}

interface CommentsContextProps {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const CommentsContext = createContext<CommentsContextProps | undefined>(undefined);

export const CommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <CommentsContext.Provider value={{ comments, addComment, setComments }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentsProvider');
  }
  return context;
};
