import React, { useState, useEffect } from 'react';
import '../css/SingleComment.css';
import { fetchUser } from '../utils/fetchUser';
import { formatDate } from '../utils/dateUtils';
import { fetchImageUrl } from '../utils/fetchImageUrl';
import { Link } from 'react-router-dom'; 


const SingleComment = ({ comment }: { comment: { _id: string; authorId: string; content: string; date: string; authorImage?: string } }) => {
  const [user, setUser] = useState<{ _id: string , name: string; image: string } | null>(null);

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
      <Link to={`/profile/${user? user._id : ""}`} className="avatar-link">
        <img
           src={user?.image ? `${fetchImageUrl(user.image)}` : `https://p7.hiclipart.com/preview/691/765/226/computer-icons-person-anonymous.jpg`}
          alt="Author Avatar"
          className="avatar"
        />
      </Link>
      </div>
      <div className="comment-right">
      <Link to={`/profile/${user?._id}`} className="author-name-link">
        <div className="comment-author">{user?.name || comment.authorId}</div>
      </Link>
        <div className="comment-content">{comment.content}</div>
        <div className="comment-date">{formatDate(comment.date)}</div>
      </div>
    </div>
  );
};

export default SingleComment;
