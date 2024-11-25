import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { getPostById } from '../utils/PostUtils';  
import { fetchComments } from '../utils/fetchComments';  
import SinglePost from './SinglePost';  
import { CommentsProvider } from './contexts/CommentProvider';


const AllComments = () => {
  const { postId } = useParams();  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    const getPostAndComments = async () => {
      try {
        const postData = postId ? await getPostById(postId) : null;
        setPost(postData);
        const commentsData = postId ? await fetchComments(postId) : null;
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching post and comments:', error);
      }
    };

    getPostAndComments();
  }, [postId]);  

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="all-comments">
      <CommentsProvider>
         <SinglePost post={post} />  
      </CommentsProvider>
    </div>
  );
};

export default AllComments;
