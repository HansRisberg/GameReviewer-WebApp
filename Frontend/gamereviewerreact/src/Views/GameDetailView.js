// GameDetailView.js (VIEW)
import React from 'react';
import GameDetail from '../Components/GameDetail'; // Adjust the path as needed

const GameDetailView = () => {
  return (
    <div>
      <h1>Game Detail View</h1>
      <p>This is where you can view detailed information about a game.</p>
      <GameDetail /> {/* Render the GameDetail component */}
    </div>
  );
};

export default GameDetailView;
