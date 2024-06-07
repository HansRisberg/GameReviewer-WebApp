import React from 'react';
import { useParams } from 'react-router-dom';
import GameDetailIgdb from '../Components/GameDetailIgdb';

const GameDetailIgdbView = () => {
  // Assuming you're using React Router useParams to get the id from the route
  const { id: gameId } = useParams(); 

  return (
    <div>
      <h1>Game Detail View</h1>
      <p>This is where you can view detailed information about a game from the IGDB database.</p>   
      {/* Pass the id to GameDetailIgdb */}
      <GameDetailIgdb gameid={gameId} />
    </div>
  );
};

export default GameDetailIgdbView;
