// // Navigation.js

// import React from 'react';
// import { Link } from 'react-router-dom';

// // A simple navbar to navigate the site. 
// const Navigation = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/gamesview">Games</Link>
//         </li>
//         <li>
//           <Link to="/reviewsview">Reviews</Link>
//         </li>
//         <li>
//           <Link to="/addgameview">Add Game</Link>
//         </li>
//         {/* Add more links as needed */}
//       </ul>
//     </nav>
//   );
// };

// export default Navigation;

// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none' }}>
        <li>
          <Link to="/" style={{ color: '#3f51b5', textDecoration: 'none' }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/gamesview" style={{ color: '#3f51b5', textDecoration: 'none' }}>
            Games
          </Link>
        </li>
        <li>
          <Link to="/reviewsview" style={{ color: '#3f51b5', textDecoration: 'none' }}>
            Reviews
          </Link>
        </li>
        <li>
          <Link to="/addgameview" style={{ color: '#3f51b5', textDecoration: 'none' }}>
            Add Game
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;
