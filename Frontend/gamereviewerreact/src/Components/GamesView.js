// GamesView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GamesView = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7168/api/Games/');
        console.log('API Response:', response.data);
        
        // Sort the games alphabetically based on the title
        const sortedGames = response.data["$values"].sort((a, b) => a.title.localeCompare(b.title));
        setGames(sortedGames);
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

