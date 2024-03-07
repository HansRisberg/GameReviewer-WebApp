import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GamesListComponent = ({ selectedCategory }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = selectedCategory === 'All categories'
          ? 'https://localhost:7168/api/Games/'
          : `https://localhost:7168/api/Games?category=${encodeURIComponent(selectedCategory)}`;

        console.log('API Request URL:', url);

        const gamesResponse = await axios.get(url);

        // Flatten the game data and replace referenced games with actual game data
        const flatGames = gamesResponse.data["$values"].flatMap((game) => {
          if (game["$ref"]) {
            const referencedGame = gamesResponse.data["$values"].find((refGame) => refGame["$id"] === game["$ref"]);
            if (referencedGame) {
              return [referencedGame];
            }
          }
          return [game];
        });

        // Set games without sorting
        setGames(flatGames);
        console.log('Games Response:', gamesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

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

export default GamesListComponent;
