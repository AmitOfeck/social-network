import React, { useState } from 'react';
import '../css/CreateComment.css';
import { createCommentUtils } from '../utils/createCommentUtils';
import { useComments } from './contexts/CommentProvider';


const CreateComment = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string>(''); 
  const { addComment } = useComments();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value); 
  };

  const handleSubmit = async () => {
    if (comment.trim() === '') return; 
    
    setLoading(true); // 
    setErrorMessage(''); 

    try {
      await createCommentUtils(postId, comment);
      const authorId = localStorage.getItem('userId');
      if(authorId !== null){
        addComment({
          _id: Date.now().toString(),
          authorId: authorId, 
          content: comment,
          date: new Date().toISOString(),
        });
      }
      setComment(''); 
    } catch (error) {
      setErrorMessage('Failed to post comment. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="create-comment">
      <textarea
        className="comment-textarea"
        value={comment} 
        onChange={handleChange} 
        placeholder="Write a comment..."
        rows={2} 
      />
      <div style={{ display: 'flex', flexDirection: 'row' }}>     
      <button 
        className="submit-btn" 
        onClick={handleSubmit} 
        disabled={comment.trim() === '' || loading}
      >
        {loading ? 'Posting...' : 'Post'} 
      </button>
      </div>
    </div>
  );
};

export default CreateComment;
