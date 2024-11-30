import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../utils/PostUtils';
import '../css/EditPost.css';
import { fetchImageUrl } from '../utils/fetchImageUrl';


const EditPost = () => {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(''); 
  
  const { postId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const post = await getPostById(postId); 
          setContent(post.content);
          setOriginalPhoto(post.photoUrl); 
        } catch (error) {
          setErrorMessage('Failed to fetch post. Please try again.');
          console.error('Error fetching post:', error);
        }
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId) {
      setErrorMessage('Post ID is missing.');
      return;
    }
  
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      const formData = new FormData();
      formData.append('content', content); 
      if (photo) {
        formData.append('photo', photo); 
      } else if (originalPhoto) {
        formData.append('photo', originalPhoto); 
      }

      const response = await updatePost(postId, formData); 
      const updatedPost = response.post;  
  
      setSuccessMessage('Post updated successfully!');
      navigate(`/comments/${postId}`); 
    } catch (error) {
      setErrorMessage('Failed to update post. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setPhoto(file);
  };

  return (
    <div className="edit-post-container">
      <div className="header">
        <h2>Edit Post</h2>
      </div>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="input-group">
          <label htmlFor="content">Edit your content</label>
          <textarea
            id="content"
            className="input-field"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Update your thoughts..."
          />
        </div>
        <div className="input-group">
          <label htmlFor="photo" className="photo-label">
            Change Photo (optional)
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          {originalPhoto && !photo && (
            <div className="existing-photo">
              <img
               src={originalPhoto ? `${fetchImageUrl(originalPhoto)}` : `https://via.placeholder.com/50`} 
               alt="Current Post Photo" 
               className="existing-photo-img" />
            </div>
          )}
        </div>
        <button type="submit" className="submit-button" disabled={loading || content.trim() === ''}>
          {loading ? 'Updating Post...' : 'Update Post'}
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default EditPost;
