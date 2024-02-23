// GamesView.js (VIEW)

import React from 'react';
import GamesViewComponent from '../Components/GamesView'; // Assuming this is the correct path

const GamesView = () => {
  return (
    <div>
      <h2>Welcome to the Games View!</h2>
      <p>This is where you can view the list of games.</p>
      <GamesViewComponent /> {/* Render the component here */}
    </div>
  );
};

export default GamesView;
