// Navigation.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav style={{ backgroundColor: 'black' }}>
      <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none' }}>
        <li style={{ display: location.pathname === '/' ? 'none' : 'block' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </Link>
        </li>
        <li style={{ display: location.pathname === '/gamesview' ? 'none' : 'block' }}>
          <Link to="/gamesview" style={{ color: 'white', textDecoration: 'none' }}>
            Games
          </Link>
        </li>
        <li style={{ display: location.pathname === '/reviewsview' ? 'none' : 'block' }}>
          <Link to="/reviewsview" style={{ color: 'white', textDecoration: 'none' }}>
            Reviews
          </Link>
        </li>
        <li style={{ display: location.pathname === '/addgameview' ? 'none' : 'block' }}>
          <Link to="/addgameview" style={{ color: 'white', textDecoration: 'none' }}>
            Add Game
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;

