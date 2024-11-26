import React, { useState, useEffect } from 'react';
import './SinglePost';
import '../css/SinglePost.css'; 
import { fetchUser } from '../utils/fetchUser';
import Comments from './Comments';
import CreateComment from './CreateComment';
import { formatDate } from '../utils/dateUtils';
import { fetchImageUrl } from '../utils/fetchImageUrl';
import { deletePost } from '../utils/PostUtils'
import { sendLikeRequest, checkLikeStatus, removeLike } from '../utils/likeUtils';
import { Link } from 'react-router-dom'; 
import { useComments } from './contexts/CommentProvider';
// import { usePosts } from './contexts/PostContext';

const SinglePost = ({ post }: { post: { _id: string; content: string; photoUrl?: string; authorId: string; date: string; likesCount: number; commentCount: number } }) => {
    
  const [user, setUser] = useState<{ _id: string , name: string; image: string } | null>(null);
  const [liked, setLiked] = useState(false); 
  const [likesCount, setLikesCount] = useState(post.likesCount); 
  const { comments, setComments } = useComments();
  // const { deletePostFromContext } = usePosts();

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

  const handleLike = async () => {
    try {
      const authorId = localStorage.getItem('userId') || ''; 
      if (!authorId) {
        console.error('User ID not found in localStorage');
        return;
      }
      await sendLikeRequest(post._id , authorId); 
      setLikesCount((prev) => prev + 1); 
      setLiked(true); 
    } catch (error) {
      console.error('Error sending like request:', error);
    }
  };



  const handleRemoveLike = async () => {
    try {
      const authorId = localStorage.getItem('userId') || ''; 
      if (!authorId) {
        console.error('User ID not found in localStorage');
        return;
      }
      await removeLike(post._id, authorId); 
      setLikesCount((prev) => Math.max(prev - 1, 0)); 
      setLiked(false); 
    } catch (error) {
      console.error('Error removing like:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post._id);
      // deletePostFromContext(post._id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };



  return (
    <div key={post._id} className="post">
      <div id="header">
      <Link to={`/profile/${user? user._id : ""}`} className="avatar-link">
        <img
          src={user?.image ? `${fetchImageUrl(user.image)}` : `https://via.placeholder.com/50`}
          alt="Author Avatar"
          className="avatar"
        />
       </Link> 
        <div className="author-info">
        <Link to={`/profile/${user?._id}`} className="author-name-link">
            <span className="author-name">{user?.name || post.authorId}</span>
        </Link>
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
          <span
            onClick={liked ? handleRemoveLike : handleLike} 
            style={{ color: liked ? 'red' : '#007bff', cursor: 'pointer' }}
          >
            Like ({likesCount})
          </span>
          <Link to={`/comments/${post._id}`} style={{ textDecoration: 'none' }}>
            <span>Comment ({comments.length})</span>
          </Link>
        </div>
        {localStorage.getItem('userId') === post.authorId && (
               <div className="post-actions">
               <button
                 className="edit-btn"
                 onClick={() => console.log('Redirect to edit page')}
               >
                 ✏️
               </button>
       
               <button
                 className="delete-btn"
                 onClick={handleDeletePost}
               >
                 🗑️
               </button>
             </div>
        )}
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
