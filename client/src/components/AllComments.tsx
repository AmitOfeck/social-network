import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // הוספת useParams
import { getPostById } from '../utils/PostUtils';  // היבוא של הפונקציה החדשה
import { fetchComments } from '../utils/fetchComments';  // פונקציה לשליפת תגובות לפוסט
import SinglePost from './SinglePost';  // היבוא של הקומפוננטה SinglePost
import { CommentsProvider } from './contexts/CommentProvider';


const AllComments = () => {
  const { postId } = useParams();  // שליפת ה-ID של הפוסט מה-URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    // שליפת הפוסט והתגובות לפי ה-ID
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
  }, [postId]);  // Dependency array כולל את postId, אז כאשר ה-ID משתנה, הפונקציה תרוץ שוב

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="all-comments">
      {/* הצגת הקומפוננטה SinglePost */}
      <CommentsProvider>
         <SinglePost post={post} />  {/* העברת הפוסט כ-prop לקומפוננטה SinglePost */}
      </CommentsProvider>
    </div>
  );
};

export default AllComments;
