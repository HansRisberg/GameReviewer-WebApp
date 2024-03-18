import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ProfileIcon = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleLogout = () => {
    logout();
    // Implement any additional logout logic here
  };

  const handleLoginClick = () => {
    // Redirect to login page when not logged in
    navigate('/login'); // Use navigate function instead of history.push
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={isLoggedIn ? () => setIsOpen(true) : handleLoginClick} style={{ cursor: 'pointer' }}>
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
            {/* Add more dropdown options as needed */}
          </ul>
        </div>
      )}
      {!isLoggedIn && isOpen && (
        <div style={{ position: 'absolute', top: '40px', right: '0', backgroundColor: 'white', border: '1px solid black' }}>         
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
