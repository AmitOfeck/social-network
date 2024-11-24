import React, { useEffect, useState } from 'react';
import { fetchUser } from '../utils/fetchUser';
import '../css/NavBar.css';
import { fetchImageUrl } from '../utils/fetchImageUrl';

const NavBar = () => {
  const [user, setUser] = useState<{ name: string; image: string } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = localStorage.getItem('userId'); // נניח שה- userId שמור ב- localStorage
        if (userId) {
          const fetchedUser = await fetchUser(userId);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    loadUser();
  }, []);

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <a href="/feed">MySocial</a>
      </div>
      <div className="nav-links">
        <a href="/feed" className="nav-link">
          Home
        </a>
        <a href="/profile" className="nav-link">
          {user?.image ? (
            <img
              src={user.image ? `${fetchImageUrl(user.image)}` : `https://via.placeholder.com/50`}
              alt={user.name}
              className="user-avatar"
            />
          ) : (
            <div className="user-avatar-placeholder"></div>
          )}
         {/* {user?.name && <span className="user-name">{user.name}</span>} */}
        </a>
        <button className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
