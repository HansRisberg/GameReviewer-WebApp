import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';
import '../CSS/Navigation.css'; // Import a CSS file for consistent styling

const Navigation = () => {
  return (
    <nav className="navbar"> {/* Apply a class for styling */}
      <ul className="nav-list"> {/* Use a class for the list */}
        <li className="nav-item"> {/* Use a class for each item */}
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
