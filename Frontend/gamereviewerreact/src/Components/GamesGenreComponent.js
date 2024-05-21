import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GamesGenreComponent = ({ onGenreChange }) => {
  const [availableGenres, setAvailableGenres] = useState(['All genres']);
  const [selectedGenre, setSelectedGenre] = useState('All genres');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of genres
        const genresResponse = await axios.get('https://gamereviewerbackendapi.azurewebsites.net/api/Genres/');
        console.log('Genres API Response:', genresResponse.data);

        // Extract unique genres from the genres data
        const genresArray = genresResponse.data["$values"] || genresResponse.data;
        const genres = Array.isArray(genresArray) ? genresArray.map((genre) => genre.name) : [];

        console.log('Available Genres:', genres);
        setAvailableGenres(['All genres', ...genres]); // Update state with initial and fetched genres
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle genre selection
  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    console.log('Selected Genre:', selectedGenre);

    // Update state with the selected genre
    setSelectedGenre(selectedGenre);

    // Notify the parent component about the genre change
    onGenreChange(selectedGenre);
  };

  return (
    <div>
      <label htmlFor="genre">Select a genre: </label>
      <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
        {availableGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GamesGenreComponent;
