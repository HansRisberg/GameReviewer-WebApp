import React, { useState, useEffect } from 'react';
import { createGame, getGenres } from '../Services/Api'; // Updated import
import { FormControl, MenuItem, Select, InputLabel, OutlinedInput, Chip, Box } from '@mui/material';
import '../CSS/GameForm.css';

const GameForm = () => {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [selectedPgRating, setSelectedPgRating] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]); 
  const [genres, setGenres] = useState([]); 

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getGenres(); 
        const genresData = response.data?.$values || [];
        console.log('Fetched Genres:', genresData); 
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching genres:', error); 
      }
    };

    fetchGenres();
  }, []);

  const handleAddGame = async (e) => {
    e.preventDefault();

    if (!title.trim() || selectedGenres.length === 0) { 
      alert('Game Title and at least one Genre are required'); 
      return;
    }

    const newGame = {
      title: title,
      releaseDate: releaseDate,
      pgRating: selectedPgRating,
      genres: selectedGenres, 
    };

    try {
      const response = await createGame(newGame);
      console.log('Game added:', response.data);
      setTitle('');
      setReleaseDate('');
      setSelectedPgRating('');
      setSelectedGenres([]); 
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Add Game</h1>
      <form onSubmit={handleAddGame}>
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="game-title">Game Title</InputLabel>
            <OutlinedInput
              id="game-title"
              label="Game Title"
              type="text"
              className="text-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="release-date"></InputLabel>
            <OutlinedInput
              id="release-date"
              label="Release Date"
              type="date"
              className="text-field"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="pg-rating">PG Rating</InputLabel>
            <Select
              id="pg-rating"
              value={selectedPgRating}
              onChange={(e) => setSelectedPgRating(e.target.value)}
              label="PG Rating"
            >
              <MenuItem value="">Select PG Rating</MenuItem>
              <MenuItem value="G">G</MenuItem>
              <MenuItem value="PG">PG</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="R13">R13</MenuItem>
              <MenuItem value="R16">R16</MenuItem>
              <MenuItem value="R18">R18</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="genres">
              Genres - Multiple Genres can be selected
            </InputLabel>
            <Select
              labelId="genres-label"
              id="genres"
              multiple
              value={selectedGenres}
              onChange={(e) => setSelectedGenres(e.target.value)}
              input={<OutlinedInput label="Genres - Multiple Genres can be selected" />}
              renderValue={(selected) => (
                <Box className="chips">
                  {selected.map((value) => (
                    <Chip key={value} label={value} className="chip" />
                  ))}
                </Box>
              )}
            >
              {genres.map((genre) => ( 
                <MenuItem key={genre.genreId} value={genre.name}> 
                  {genre.name} 
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <button type="submit" className="submit-button">Add Game</button>
      </form>
    </div>
  );
};

export default GameForm;
