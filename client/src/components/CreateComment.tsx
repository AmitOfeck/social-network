import React, { useState } from 'react';
import '../css/CreateComment.css';
import { createCommentUtils } from '../utils/createCommentUtils';

const CreateComment = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string>(''); 

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value); 
  };

  const handleSubmit = async () => {
    if (comment.trim() === '') return; 
    
    setLoading(true); // 
    setErrorMessage(''); 

    try {
      await createCommentUtils(postId, comment);
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
      <button 
        className="submit-btn" 
        onClick={handleSubmit} 
        disabled={comment.trim() === '' || loading}
      >
        {loading ? 'Posting...' : 'Post'} 
      </button>
    </div>
  );
};

export default CreateComment;
