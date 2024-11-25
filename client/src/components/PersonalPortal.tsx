import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../utils/fetchUser';
import { fetchImageUrl } from '../utils/fetchImageUrl';
import '../css/PersonalPortal.css';

const PersonalPortal = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<{
    _id: string;
    name: string;
    email: string;
    image: string;
    createdAt: string;
  } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (id) {
          const fetchedUser = await fetchUser(id);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    loadUser();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="personal-portal-container">
      <div className="profile-header">
        <img
          src={user.image ? `${fetchImageUrl(user.image)}` : `https://via.placeholder.com/50`}
          alt={user.name}
          className="profile-image"
        />
        <h1>{user.name}</h1>
        <p className="user-email">{user.email}</p>
        <p className="user-joined-date">Joined: {formatDate(user.createdAt)}</p>
      </div>
         <div className="profile-content">
            <h2>About {user?.name}</h2>
            <p>This is where you can discover more about the world of {user?.name}!</p>
        </div>
    </div>
  );
};

export default PersonalPortal;