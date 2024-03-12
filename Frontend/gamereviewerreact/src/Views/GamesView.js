import React, { useState } from 'react';
import GamesListComponent from '../Components/GamesListComponent';
import GamesGenreComponent from '../Components/GamesGenreComponent'; 

const GamesView = () => {
  const [selectedGenre, setSelectedGenre] = useState('All genres'); 

  const handleGenreChange = (genre) => { 
    // Update the selected genre in the parent component
    setSelectedGenre(genre); 
  };

  return (
    <div>
      <h2>Welcome to the Games View!</h2>
      <p>This is where you can view the list of games.</p>
      <GamesGenreComponent onGenreChange={handleGenreChange} /> 
      <GamesListComponent selectedGenre={selectedGenre} /> 
    </div>
  );
};

export default GamesView;
