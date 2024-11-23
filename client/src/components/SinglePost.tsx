import React, { useState, useEffect } from 'react';
import './SinglePost'; 

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
      <h2 className="title">{post.content}</h2>
      <p className="date">{formatDate(post.date)}</p>
    </div>
    {imageUrl ? (
      <img
        src={imageUrl} 
        alt={post.content}
        className="image" 
      />
    ) : (
      <p>Loading image...</p> 
    )}
    <div className="footer">
      <p><strong>Author:</strong> {post.authorId}</p>
      <div className="actions">
        <span>Like ({post.likesCount})</span>
        <span>Comment ({post.commentCount})</span>
      </div>
    </div>
  </div>

  );
};

export default SinglePost;
