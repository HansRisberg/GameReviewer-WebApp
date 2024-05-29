import React, { useState, useEffect } from 'react';
import { getGenres } from '../Services/Api.js';
import '../CSS/GamesGenreComponent.css'; // Import the CSS file

const GamesGenreComponent = ({ onGenreChange }) => {
  const [availableGenres, setAvailableGenres] = useState(['All genres']);
  const [selectedGenre, setSelectedGenre] = useState('All genres');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresResponse = await getGenres();
        console.log('Genres API Response:', genresResponse.data);

        const genresArray = genresResponse.data["$values"] || genresResponse.data;
        const genres = Array.isArray(genresArray) ? genresArray.map((genre) => genre.name) : [];

        console.log('Available Genres:', genres);
        setAvailableGenres(['All genres', ...genres]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    console.log('Selected Genre:', selectedGenre);
    setSelectedGenre(selectedGenre);
    onGenreChange(selectedGenre);
  };

  return (
    <div className="genre-selector-container">
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
