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
      // Call the createGame function from your API to add the new game
      const response = await createGame(newGame);
      // Update the games state with the newly added game
      setGames([...games, response.data]);
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div>
      <h1>Game List</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
      <GameForm onAddGame={handleAddGame} />
    </div>
  );
};

export default GameList;
