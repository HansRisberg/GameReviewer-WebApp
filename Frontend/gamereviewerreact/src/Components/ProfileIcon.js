import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileIcon = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Close the dropdown when the user logs in
    if (isLoggedIn) {
      setIsOpen(false);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
  };

  const handleProfileIconClick = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('profile');
    setIsOpen(false);
  }

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={isLoggedIn ? handleProfileIconClick : handleLoginClick} style={{ cursor: 'pointer' }}>
        <img 
          src="Assets/profile-user.png" 
          alt="Profile" 
          style={{ 
            width: '30px', 
            height: '30px', 
            borderRadius: '50%', 
            backgroundColor: 'white' 
          }} 
        />
      </div>
      {isOpen && isLoggedIn && (
        <div style={{ position: 'absolute', top: '40px', right: '0', backgroundColor: 'white', border: '1px solid white' }}>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <button onClick={handleLogout} style={{ border: 'none',  padding: '5px 8px', cursor: 'pointer' }}>Logout</button>
            </li>
            <li style={{ display: 'inline-block' }}>
              <button onClick={handleProfileClick} style={{ border: 'none',  padding: '5px 8px', cursor: 'pointer' }}>Profile</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;

