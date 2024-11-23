import React, { useState, useEffect } from 'react';
import './SinglePost';
import '../css/SinglePost.css' 

const SinglePost = ({ post }: { post: { _id: string; content: string; photoUrl?: string; authorId: string; date: string; likesCount: number; commentCount: number } }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null); 
  const photoUrl = post.photoUrl ? post.photoUrl : "";

  useEffect(() => {
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

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
  };

  return (
    <div key={post._id} className="post">
      <div className="header">
        <img
          src={`https://via.placeholder.com/50`}
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
