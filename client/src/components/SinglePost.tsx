import React, { useState, useEffect } from 'react';
import './SinglePost'; 

const SinglePost = ({ post }: { post: { _id: string; content: string; photoUrl?: string; authorId: string; date: string; likesCount: number; commentCount: number } }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null); 
  const photoUrl = post.photoUrl ? post.photoUrl : "";

  useEffect(() => {
    const fetchImage = async () => {
      if (photoUrl) {
        try {
        //   const response = await fetch(`http://localhost:4000/get-photo/${photoUrl.replace('src/', '')}`);
        //   if (!response.ok) {
        //     throw new Error('Image not found');
        //   }

        //   const imageBlob = await response.blob();
        //   const url = URL.createObjectURL(imageBlob);
        //   setImageUrl('https://www.now14.co.il/wp-content/uploads/2024/03/MTA_202403070613429e970ace201c7feb2174d987d812e7fc-690x460-1.jpg')
          setImageUrl(`http://localhost:4000/images/${post.photoUrl?.split('/').pop()!}`)
          console.log(imageUrl)

          //setImageUrl(url); 
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
