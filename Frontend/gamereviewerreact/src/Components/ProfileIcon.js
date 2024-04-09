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

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={isLoggedIn ? handleProfileIconClick : handleLoginClick} style={{ cursor: 'pointer' }}>
        <img src="Assets/profile-user.png" alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
      </div>
      {isOpen && isLoggedIn && (
        <div style={{ position: 'absolute', top: '40px', right: '0', backgroundColor: 'white', border: '1px solid black' }}>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li>
              <button onClick={handleLogout} style={{ border: 'none', backgroundColor: 'transparent', padding: '5px 10px', cursor: 'pointer' }}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;

