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
    <div>
      <h2>{game.title}</h2>
      <p>ID: {game.gameId}</p>
      <p>Genres: {game.gameGenres && game.gameGenres.$values
        ? game.gameGenres.$values.map(genre => genre.genre ? genre.genre.name : 'Unknown').join(', ')
        : 'No genres'}</p>

      <p>Release Date: {formattedReleaseDate}</p>

      {/* Display Reviews */}
      <h3>Reviews:</h3>
      {game.gameReviews && game.gameReviews.$values.map(review => (
        <div key={review.gameReviewId}>
          <p>Reviewer: {review.reviewer.name}</p>
          <p>Email: {review.reviewer.eMail}</p>
          <p>Comment: {review.reviewContent}</p>
          {/* Add more details as needed */}
        </div>
      ))}

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
