import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchYouTubeTrailer from '../Services/youtubeApi';
import { getGame } from '../Services/Api';
import { ReviewsList } from './ReviewsList';
import '../CSS/GameDetail.css'; // Import the new CSS file

const GameDetail = () => {
  const [game, setGame] = useState([]);
  const [trailerId, setTrailerId] = useState(null);
  const { id } = useParams();

  // const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY || 'defaultApiKey';
  const apiKey = "AIzaSyBwk6hFypoetkux-GtMIA7WgsQ8lR7mROc";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameResponse = await getGame(id);
        console.log('Game Detail Response:', gameResponse.data);
        setGame(gameResponse.data);

        // Log the genres data
        console.log('Game Genres:', gameResponse.data.gameGenres);
        console.log('Game Genres Values:', gameResponse.data.gameGenres.$values);

        // Fetch YouTube trailer for the game
        const videoId = await fetchYouTubeTrailer(gameResponse.data.title, apiKey);
        setTrailerId(videoId);
      } catch (error) {
        console.error(`Error fetching game details or genres for ID ${id}:`, error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, apiKey]);

  if (!game) {
    return <div>Loading...</div>;
  }

  // Format the ReleaseDate to display only day-month-year
  const formattedReleaseDate = new Date(game.releaseDate).toLocaleDateString('en-GB');

  return (
    <div className="game-detail-container">
      <h2>{game.title}</h2>
      <p>Genres: {game.gameGenres && game.gameGenres.$values
        ? game.gameGenres.$values.map(genre => genre.genre ? genre.genre.name : 'Unknown').join(', ')
        : 'No genres'}</p>
      <p>Release Date: {formattedReleaseDate}</p>
  
      {/* Embed YouTube trailer if available */}
      <p style={{ color: 'red' }}>If the game trailer is not displaying, then the query limit for the API has been reached for today</p>
      {trailerId && (
        <div className="trailer-container">
          <iframe
            src={`https://www.youtube.com/embed/${trailerId}`}
            title="YouTube Trailer"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div>
        <ReviewsList gameId={game.gameId} />
      </div>
    </div>
  );
};

export default GameDetail;
