import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, updateUserById } from '../utils/userUtils';
import '../css/EditUser.css';
import { fetchImageUrl } from '../utils/fetchImageUrl';
import { useUser } from './contexts/UserContext';

const EditUser = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useUser(); 

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const fetchedUser = await fetchUserById(userId);
          setName(fetchedUser.name);
          setOriginalPhoto(fetchedUser.image);
        } catch (error) {
          setErrorMessage('Failed to fetch user data.');
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setPhoto(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setErrorMessage('User ID is missing.');
      return;
    }
  
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (photo) {
        formData.append('image', photo);
      }
  
      const updatedUser = await updateUserById(userId, formData);
  
      setUser({
        name: updatedUser.user.name, 
        image: updatedUser.user.image, 
      });
  
      setSuccessMessage('User updated successfully!');
      navigate(`/profile/${userId}`);
    } catch (error) {
      setErrorMessage('Failed to update user. Please try again.');
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-user-container">
      <div className="header" style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Edit User</h2>
      </div>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="photo">Change Profile Photo (optional)</label>
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
                alt="Current User Photo"
                className="existing-photo-img"
              />
            </div>
          )}
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default EditUser;
