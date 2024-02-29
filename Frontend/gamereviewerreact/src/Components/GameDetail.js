
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import fetchYouTubeTrailer from '../Services/youtubeApi';  

const GameDetail = () => {
  const [game, setGame] = useState([]);
  const [trailerId, setTrailerId] = useState(null);
  const { id } = useParams();
  
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY || 'defaultApiKey';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameResponse = await axios.get(`https://localhost:7168/api/Games/${id}`);
        console.log('Game Detail Response:', gameResponse.data);
        setGame(gameResponse.data);

        // Fetch YouTube trailer for the game
        const videoId = await fetchYouTubeTrailer(gameResponse.data.title, apiKey);
        setTrailerId(videoId);
      } catch (error) {
        console.error(`Error fetching game details or categories for ID ${id}:`, error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, apiKey]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{game.title}</h2>
      <p>ID: {game.gameId}</p>
      <p>Categories: {game.gameCategories && game.gameCategories.$values
          ? game.gameCategories.$values.map(category => category.category.name).join(', ')
          : 'No categories'}</p>
      <p>Release Date: {game.releaseDate}</p>

      {/* Embed YouTube trailer if available */}
      {trailerId && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailerId}`}
          title="YouTube Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      {/* Add more details as needed */}
    </div>
  );
};

export default GameDetail;
