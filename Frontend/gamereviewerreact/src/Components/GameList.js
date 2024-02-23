import React, { useEffect, useState } from 'react';
import { getGames, createGame } from '../Services/Api';
import GameForm from './GameForm';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGames();
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddGame = async (newGame) => {
    try {
      const response = await createGame(newGame);
      setGames((prevGames) => [...prevGames, response.data]);
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div> 
      <h1>Game List</h1>
      <ul>
        {games.map((Game, index) => (
          <li key={index}>{Game.title}</li>
        ))}
      </ul>
      <GameForm onGameAdded={handleAddGame} />
    </div>
  );
};

export default GameList;
