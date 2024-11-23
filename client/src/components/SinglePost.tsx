import React, { useState, useEffect } from 'react';
import './SinglePost';
import '../css/SinglePost.css' 
import { fetchUser } from '../utils/fetchUser';

const SinglePost = ({ post }: { post: { _id: string; content: string; photoUrl?: string; authorId: string; date: string; likesCount: number; commentCount: number } }) => {
    
  const [imageUrl, setImageUrl] = useState<string | null>(null); 
  const photoUrl = post.photoUrl ? post.photoUrl : "";
  const [user, setUser] = useState<{ name: string; image: string } | null>(null); // סטייט למידע על המשתמש


  useEffect(() => {
    //console.log(post)
    const fetchImage = async () => {
      if (photoUrl) {
        try {
          setImageUrl(`http://localhost:4000/images/${post.photoUrl?.split('/').pop()!}`)
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    };

    fetchImage();
  }, [photoUrl]); 

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

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
  };

  return (
    <div key={post._id} className="post">
      <div className="header">
        <img
          src={user?.image ? `http://localhost:4000/images/${user.image?.split('/').pop()!}` : `https://via.placeholder.com/50`}
          alt="Author Avatar"
          className="avatar"
        />
        <div className="author-info">
          <span className="author-name">{post.authorId}</span>
          <span className="date">{formatDate(post.date)}</span>
        </div>
      </div>
      <div className="content">{post.content}</div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.content}
          className="image"
        />
      )}
      <div className="footer">
        <div className="actions">
          <span>Like ({post.likesCount})</span>
          <span>Comment ({post.commentCount})</span>
        </div>
      </div>
    </div>
  );
  
};

export default SinglePost;
