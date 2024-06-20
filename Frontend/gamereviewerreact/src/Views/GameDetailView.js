import React from 'react';
import { useParams } from 'react-router-dom';
import GameDetail from '../Components/GameDetail';
import AddReview from '../Components/AddReview';

const GameDetailView = () => {

  const { id: gameId } = useParams();

  return (
    <div>
      <h1>Game Detail View</h1>
      <p>This is where you can write a review, you must be logged in</p>
      <AddReview gameId={gameId} />
      <p>This is where you can view detailed information about a game.</p>
      <GameDetail gameId={gameId} />


    </div>
  );
};

export default GameDetailView;

