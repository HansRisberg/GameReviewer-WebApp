import React from 'react';
import { useParams } from 'react-router-dom';
import GameDetailIgdb from '../Components/GameDetailIgdb';

const GameDetailIgdbView = () => {

  const { id: gameId } = useParams(); 

  return (
    <div>
      <h1>Game Detail View</h1>
      <p>This is where you can view detailed information about a game from the IGDB database.</p>   
      <GameDetailIgdb gameid={gameId} />
    </div>
  );
};

export default GameDetailIgdbView;
