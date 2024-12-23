import React, { useState, useEffect } from 'react';
import { fetchComments } from '../utils/fetchComments';
import SingleComment from './SingleComment'; 
import { useComments } from './contexts/CommentProvider';


const Comments = ({ postId }: { postId: string }) => {
  const { comments, setComments } = useComments();
  const [loading, setLoading] = useState<boolean>(true);

  const isCommentsPage = window.location.pathname.includes('/comments');

  useEffect(() => {
    const getComments = async () => {
      try {
        const fetchedComments = await fetchComments(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, [postId]); 

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div className="comments-section">
      {isCommentsPage
        ? comments.map((comment: any) => (
            <SingleComment key={comment._id} comment={comment} />
          ))
        : comments.slice(0, 2).map((comment: any) => (
            <SingleComment key={comment._id} comment={comment} />
          ))
      }
    </div>
  );
};

export default Comments;
