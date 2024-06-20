import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';
import '../CSS/Navigation.css'; 

const Navigation = () => {
  return (
    <nav className="navbar"> 
      <ul className="nav-list"> 
        <li className="nav-item"> 
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/gamesview" className="nav-link">Games</Link>
        </li>
        <li className="nav-item">
          <Link to="/addgameview" className="nav-link">Add Game</Link>
        </li>
        <li className="nav-item">
          <ProfileIcon /> {/* Profile icon */}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
