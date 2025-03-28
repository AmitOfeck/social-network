import React, { useState , useEffect} from 'react';
import '../css/CreatePost.css';
import { createPost } from '../utils/PostUtils'; 
import { fetchUser } from '../utils/fetchUser';
import { usePosts } from './contexts/PostContext';
import { Link } from 'react-router-dom'; 
import { fetchImageUrl } from '../utils/fetchImageUrl';
import { fetchGeminiFact } from '../utils/PostUtils';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState<File | null>(null); 
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState<{ _id: string , name: string; image: string } | null>(null); 

  const { addPost } = usePosts();
  const authorId = localStorage.getItem('userId'); 

  useEffect(() => {
    const getUserInfo = async () => {
      if (authorId) {
        try {
          const userInfo = await fetchUser(authorId); 
          setUser(userInfo);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    getUserInfo();
  }, [authorId]);

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
      formData.append('content', content);
      if (photo){
        formData.append('photo', photo);
      } 


      const response = await createPost(formData);
      const newPost = response.post;
      addPost(newPost);
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

  const handleGenerateFact = async () => {
    const fact = await fetchGeminiFact();
    if (fact) {
      setContent(fact);
    }
  };

  return (
    <div className="create-post-container">
      <div className="header2">
        <Link to={`/profile/${user ? user._id : ""}`} className="avatar-link2">
          <img
            src={user?.image ? `${fetchImageUrl(user.image)}` : `https://p7.hiclipart.com/preview/691/765/226/computer-icons-person-anonymous.jpg`}
            alt="User Avatar"
            className="avatar2"
          />
        </Link>
        <h2>Create a New Post</h2>
      </div>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="input-group">
          <label htmlFor="content">What’s on your mind?</label>
          <textarea
            id="content"
            className="input-field"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Share your thoughts..."
          />
        </div>
        <button type="button" className="fact-button" onClick={handleGenerateFact}>
          Generate Random Fact
        </button>
        <div className="input-group">
          <label htmlFor="photo" className="photo-label">
            Add a Photo
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading || content.trim() === ''}>
            {loading ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default CreatePost;
