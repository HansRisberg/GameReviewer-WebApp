import React, { useState } from 'react';
import GamesListComponent from '../Components/GamesListComponent';
import GamesGenreComponent from '../Components/GamesGenreComponent'; 
import GameSearch from '../Components/GameSearch';

const GamesView = () => {
  const [selectedGenre, setSelectedGenre] = useState('All genres'); 

  const handleGenreChange = (genre) => { 
    
    setSelectedGenre(genre); 
  };

  return (
    <div>
      <h3 style={{ color: 'red' }}>!! If the App has been dormant for 20 min, It needs about 20-30 seconds to start up. This is because of Azures free hosting policy</h3>
      <GameSearch/>
      <GamesGenreComponent onGenreChange={handleGenreChange} /> 
      <GamesListComponent selectedGenre={selectedGenre} /> 
    </div>
  );
};

export default GamesView;
