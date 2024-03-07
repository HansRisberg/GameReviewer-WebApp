import React, { useState } from 'react';
import GamesListComponent from '../Components/GamesListComponent';
import GamesCategoryComponent from '../Components/GamesCategoryComponent';

const GamesView = () => {
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  const handleCategoryChange = (category) => {
    // Update the selected category in the parent component
    setSelectedCategory(category);
  };

  return (
    <div>
      <h2>Welcome to the Games View!</h2>
      <p>This is where you can view the list of games.</p>
      <GamesCategoryComponent onCategoryChange={handleCategoryChange} />
      <GamesListComponent selectedCategory={selectedCategory} />
    </div>
  );
};

export default GamesView;

