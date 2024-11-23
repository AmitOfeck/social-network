import React, { useState, useEffect } from 'react';
import '../css/SingleComment.css';
import { fetchUser } from '../utils/fetchUser';

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

  const formatDate = (date: string) => {
    const commentDate = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `Few seconds ago`;
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      const diffInMonths = Math.floor(diffInSeconds / 2592000);
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }
  };

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
