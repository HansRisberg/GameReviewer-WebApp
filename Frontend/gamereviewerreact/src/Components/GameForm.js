import React, { useState, useEffect } from 'react';
import { createGame, getGenres } from '../Services/Api'; // Updated import
import { FormControl, MenuItem } from '@mui/material';
import {
  StyledFormContainer,
  StyledLabel,
  StyledTextField,
  StyledButton,
  StyledSelect,
} from '../Styles/GameFormStyles';

const GameForm = () => {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [selectedPgRating, setSelectedPgRating] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]); // Updated state name
  const [genres, setGenres] = useState([]); // Updated state name

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getGenres(); // Updated function name
        const genresData = response.data?.$values || [];
        console.log('Fetched Genres:', genresData); // Updated log message
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching genres:', error); // Updated log message
      }
    };

    fetchGenres();
  }, []);

  const handleAddGame = async (e) => {
    e.preventDefault();

    if (!title.trim() || selectedGenres.length === 0) { // Updated variable name
      alert('Game Title and at least one Genre are required'); // Updated alert message
      return;
    }

    const newGame = {
      title: title,
      releaseDate: releaseDate,
      pgRating: selectedPgRating,
      genres: selectedGenres, // Updated variable name
    };

    try {
      const response = await createGame(newGame);
      console.log('Game added:', response.data);
      setTitle('');
      setReleaseDate('');
      setSelectedPgRating('');
      setSelectedGenres([]); // Updated variable name
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <StyledFormContainer>
      <h1>Add Game</h1>
      <form onSubmit={handleAddGame}>
        <FormControl fullWidth>
          <StyledLabel>Game Title</StyledLabel>
          <StyledTextField
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <StyledLabel>Release Date</StyledLabel>
          <StyledTextField
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <StyledLabel>PG Rating</StyledLabel>
          <StyledSelect
            value={selectedPgRating}
            onChange={(e) => setSelectedPgRating(e.target.value)}
          >
            <MenuItem value="">Select PG Rating</MenuItem>
            <MenuItem value="G">G</MenuItem>
            <MenuItem value="PG">PG</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="R13">R13</MenuItem>
            <MenuItem value="R16">R16</MenuItem>
            <MenuItem value="R18">R18</MenuItem>
          </StyledSelect>
        </FormControl>

        <FormControl fullWidth>
          <StyledLabel>Genres</StyledLabel> {/* Updated label */}
          <StyledSelect
            multiple
            value={selectedGenres} // Updated variable name
            onChange={(e) => setSelectedGenres(e.target.value)} // Updated variable name
          >
            {genres.map((genre) => ( // Updated variable name
              <MenuItem key={genre.genreId} value={genre.name}> {/* Updated variable name */}
                {genre.name} {/* Updated variable name */}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>

        <StyledButton type="submit">Add Game</StyledButton>
      </form>
    </StyledFormContainer>
  );
};

export default GameForm;
