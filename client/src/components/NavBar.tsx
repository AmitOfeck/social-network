import React, { useEffect, useState } from 'react';
import { fetchUser } from '../utils/fetchUser';
import '../css/NavBar.css';
import { fetchImageUrl } from '../utils/fetchImageUrl';
import { Link , useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUser } from './contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = localStorage.getItem('userId'); 
        if (userId) {
          const fetchedUser = await fetchUser(userId);
          setUser({name:fetchedUser.name, image:fetchedUser.image});
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    
      loadUser();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    Cookies.remove('refreshToken');
    setUser(null);
    navigate('/login');
  };


  return (
    <nav className="nav-bar">
      <div className="nav-logo">
         <Link to="/feed">MySocial</Link>
      </div>
      <div className="nav-links">
         <Link to="/feed" className="nav-link">
              Home
         </Link>

         {user && (
          <button
            className="edit-btn"
            onClick={() => navigate(`/editUser/${localStorage.getItem('userId')}`)} 
          >
            ✏️
          </button>
        )}

        <Link to={`/profile/${localStorage.getItem('userId')}`} className="nav-profile">
          {user?.image ? (
             <img
                src={user.image ? `${fetchImageUrl(user.image)}` : `https://via.placeholder.com/50`}
                alt={user.name}
                className="user-avatar"
            />
             ) : (
             <div className="user-avatar-placeholder"></div>
          )}
             {user?.name && <span className="user-name">{user.name}</span>}
         </Link>
         <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
