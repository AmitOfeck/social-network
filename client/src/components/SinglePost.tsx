import React, { useState, useEffect } from 'react';
import './SinglePost';
import '../css/SinglePost.css'; 
import { fetchUser } from '../utils/fetchUser';
import Comments from './Comments';
import CreateComment from './CreateComment';
import { formatDate } from '../utils/dateUtils';
import { fetchImageUrl } from '../utils/fetchImageUrl';
import { sendLikeRequest, checkLikeStatus, removeLike } from '../utils/likeUtils';

const SinglePost = ({ post }: { post: { _id: string; content: string; photoUrl?: string; authorId: string; date: string; likesCount: number; commentCount: number } }) => {
    
  const [user, setUser] = useState<{ name: string; image: string } | null>(null);
  const [liked, setLiked] = useState(false); 
  const [likesCount, setLikesCount] = useState(post.likesCount); // כדי לעדכן את מספר הלייקים

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const fetchedUser = await fetchUser(post.authorId); 
        setUser(fetchedUser); 
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const checkLike = async () => {
      try {
        const authorId = localStorage.getItem('userId'); 
        if (authorId) {
          const likeStatus = await checkLikeStatus(post._id, authorId); 
          setLiked(likeStatus.isLiked); 
        }
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    getUserInfo();
    checkLike();
  }, [post.authorId, post._id]); 



  return (
    <div key={post._id} className="post">
      <div className="header">
        <img
          src={user?.image ? `${fetchImageUrl(user.image)}` : `https://via.placeholder.com/50`}
          alt="Author Avatar"
          className="avatar"
        />
        <div className="author-info">
            <span className="author-name">{user?.name || post.authorId}</span>
            <span className="date">{formatDate(post.date)}</span>
        </div>
      </div>
      <div className="content">{post.content}</div>
      {post.photoUrl && (
        <img
          src={post.photoUrl ? `${fetchImageUrl(post.photoUrl)}` : `https://via.placeholder.com/50`}
          alt={post.content}
          className="image"
        />
      )}
      <div className="footer">
        <div className="actions">
          {/* כפתור לייק */}
          <span
            //onClick={liked ? handleRemoveLike : handleLike}  // אם הלייק קיים, נסיר אותו, אחרת נוסיף לייק
            style={{ color: liked ? 'red' : '#007bff', cursor: 'pointer' }}
          >
            Like ({likesCount})
          </span>
          <span>Comment ({post.commentCount})</span>
        </div>
      </div>
      <br/>
      <Comments postId={post._id} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>      
          <CreateComment postId={post._id}/>
      </div>
    </div>
  );
};

export default SinglePost;
