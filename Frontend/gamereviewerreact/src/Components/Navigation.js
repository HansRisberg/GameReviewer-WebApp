import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';

const Navigation = () => {
  return (
    <nav style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1000 }}>
      <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none' }}>
        <li>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/gamesview" style={{ color: 'black', textDecoration: 'none' }}>
            Games
          </Link>
        </li>
        <li>
          <Link to="/reviewsview" style={{ color: 'black', textDecoration: 'none' }}>
            Reviews
          </Link>
        </li>
        <li>
          <Link to="/addgameview" style={{ color: 'black', textDecoration: 'none' }}>
            Add Game
          </Link>
        </li>
        <li>
          <ProfileIcon /> 
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;
