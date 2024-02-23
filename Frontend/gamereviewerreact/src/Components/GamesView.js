// GamesView.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GamesView = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7168/api/Games/');
        console.log('API Response:', response.data);
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Games List</h1>
      <ul>
        {games.map((game) => (
          <li key={game.gameId}>
            <Link to={`/gamesview/${game.gameId}`} onClick={() => console.log('Clicked Game:', game.gameId)}>
              {game.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GamesView;
