import React, { useState, useEffect } from 'react';
import '../css/SingleComment.css';
import { fetchUser } from '../utils/fetchUser';
import { formatDate } from '../utils/dateUtils';


const SingleComment = ({ comment }: { comment: { _id: string; authorId: string; content: string; date: string; authorImage?: string } }) => {
  const [user, setUser] = useState<{ name: string; image: string } | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const fetchedUser = await fetchUser(comment.authorId);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUserInfo();
  }, [comment.authorId]);


  return (
    <div key={comment._id} className="single-comment">
      <div className="comment-left">
        <img
          src={user?.image ? `http://localhost:4000/images/${user.image?.split('/').pop()!}` : `https://via.placeholder.com/50`}
          alt="Author Avatar"
          className="avatar"
        />
      </div>
      <div className="comment-right">
        <div className="comment-author">{user?.name || comment.authorId}</div>
        <div className="comment-content">{comment.content}</div>
        <div className="comment-date">{formatDate(comment.date)}</div>
      </div>
    </div>
  );
};

export default SingleComment;
