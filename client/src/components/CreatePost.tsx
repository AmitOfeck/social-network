import React, { useState } from 'react';
import '../css/CreatePost.css';
import { createPost } from '../utils/PostUtils'; 

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState<File | null>(null); 
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const authorId = localStorage.getItem('userId'); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorId) {
      setErrorMessage('Author ID is missing. Please log in.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('authorId', authorId);
      formData.append('content', content);
      if (photo){
        formData.append('photo', photo);
      } 


      const response = await createPost(formData);
      setSuccessMessage('Post created successfully!');
      setContent('');
      setPhoto(null);
    } catch (error) {
      setErrorMessage('Failed to create post. Please try again.');
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
    <div className="create-post-container">
    <h2>Create a New Post</h2>
    <form onSubmit={handleSubmit} className="create-post-form">
      <div className="input-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          className="input-field"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Write your post content here..."
        />
      </div>
      <div className="input-group">
        <label htmlFor="photo">Add Photo:</label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />
      </div>
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Creating Post...' : 'Create Post'}
      </button>
    </form>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    {successMessage && <p className="success-message">{successMessage}</p>}
  </div>
  );
};

export default CreatePost;
