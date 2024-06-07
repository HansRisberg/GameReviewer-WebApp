// GameDetailIgdb.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameDetail } from '../Services/Api'

const GameDetailIgdb = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const getGameDetail = async () => {
      try {
        const data = await fetchGameDetail(id);
        console.log('Fetched Game Detail:', data); // Log the fetched data
        setGame(data);
      } catch (error) {
        console.error('Error fetching game detail:', error);
      }
    };

    getGameDetail();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <h1>{game.name}</h1>
    <p>{game.summary}</p>
    <p><strong>Storyline:</strong> {game.storyline}</p>
    <p><strong>Category:</strong> {game.category}</p>
    <p><strong>First Release Date:</strong> {new Date(game.first_release_date * 1000).toDateString()}</p>
    <p><strong>Genres:</strong> {game.genres.join(', ')}</p>
    <p><strong>Platforms:</strong> {game.platforms.join(', ')}</p>
    <p><strong>Game Modes:</strong> {game.game_modes.join(', ')}</p>
    <p><strong>Alternative Names:</strong> {game.alternative_names.join(', ')}</p>
    <p><strong>Similar Games:</strong> {game.similar_games.join(', ')}</p>
    <p><strong>Involved Companies:</strong> {game.involved_companies.join(', ')}</p>
    <p><strong>External Games:</strong> {game.external_games.join(', ')}</p>
    <p><strong>Tags:</strong> {game.tags.join(', ')}</p>
    <p><strong>Keywords:</strong> {game.keywords.join(', ')}</p>
    <p><strong>Website:</strong> <a href={game.url} target="_blank" rel="noopener noreferrer">{game.url}</a></p>
    <p><strong>Updated At:</strong> {new Date(game.updated_at * 1000).toDateString()}</p>
  </div>
  );
};

export default GameDetailIgdb;
