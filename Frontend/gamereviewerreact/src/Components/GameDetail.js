import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GameDetail = () => {
  const [game, setGame] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    console.log('ID:', id);
  
    // Check if id is defined before making the API call
    if (id) {
      const fetchGameDetail = async () => {
        try {
          const response = await axios.get(`https://localhost:7168/api/Games/${id}`);
          console.log('Game Detail Response:', response.data);
          setGame(response.data);
        } catch (error) {
          console.error(`Error fetching game details for ID ${id}:`, error);
        }
      };
  
      fetchGameDetail();
    }
  }, [id]);
  // useEffect(() => {
  //   console.log('ID:', id);
  //   const fetchGameDetail = async () => {
  //     try {
  //       const response = await axios.get(`https://localhost:7168/api/Games/${id}`);
  //       console.log('Game Detail Response:', response.data);
  //       setGame(response.data);
  //     } catch (error) {
  //       console.error(`Error fetching game details for ID ${id}:`, error);
  //     }
  //   };

  //   fetchGameDetail();
  // }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{game.title}</h2>
      <p>ID: {game.gameId}</p>
      <p>categories:</p>
      <p>Release Date: {game.releaseDate}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default GameDetail;
