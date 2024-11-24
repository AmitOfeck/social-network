import React, { useState, useEffect } from 'react';
import './SinglePost';
import '../css/SinglePost.css' 
import { fetchUser } from '../utils/fetchUser';
import Comments from './Comments';
import CreateComment from './CreateComment';
import { formatDate } from '../utils/dateUtils';
import { fetchImageUrl } from '../utils/fetchImageUrl';




const SinglePost = ({ post }: { post: { _id: string; content: string; photoUrl?: string; authorId: string; date: string; likesCount: number; commentCount: number } }) => {
    
  const [user, setUser] = useState<{ name: string; image: string } | null>(null);
  const [liked, setLiked] = useState(false); 


  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const fetchedUser = await fetchUser(post.authorId); 
        setUser(fetchedUser); 
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUserInfo();
  }, [post.authorId]);

  const toggleLike = () => {
    setLiked(!liked); 
  };


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
          <span onClick={toggleLike}  style={{ color: liked ? 'red' : '#007bff', cursor: 'pointer' }}>Like ({post.likesCount})</span>
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
