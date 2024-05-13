import React from 'react';
import { useParams } from 'react-router-dom'; // Use useParams to get route parameters
import GameDetail from '../Components/GameDetail'; // Adjust the path as needed
import AddReview from '../Components/AddReview';

const GameDetailView = () => {
  // Get the game ID from route parameters
  const { id: gameId } = useParams(); // Use useParams to extract game ID
  
  return (
    <div>
      <h1>Game Detail View</h1>
      <p>This is where you can view detailed information about a game.</p>
      
      {/* Pass the gameId to GameDetail */}
      <GameDetail gameId={gameId} />
      
      <p>This is where you can write a review, you must be logged in</p>
      
      {/* Pass the gameId to AddReview */}
      <AddReview gameId={gameId} />
    </div>
  );
};

export default GameDetailView;

