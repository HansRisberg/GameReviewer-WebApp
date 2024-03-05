import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GamesView = () => {
  const [games, setGames] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of games
        const gamesResponse = await axios.get('https://localhost:7168/api/Games/');
        console.log('Games API Response:', gamesResponse.data);

        // Fetch the list of categories
        const categoriesResponse = await axios.get('https://localhost:7168/api/Categories/');
        console.log('Categories API Response:', categoriesResponse.data);

        // Extract unique categories from the games data
        const categories = [
          ...new Set(
            gamesResponse.data["$values"]
              .flatMap((game) => game.gameCategories["$values"] || [])  // Check if gameCategories["$values"] exists
              .map((category) => category.category.name)  // Access category from the nested structure
              .filter((category) => category)
          ),
        ];
        console.log('Available Categories:', categories);
        setAvailableCategories(categories);


        // Sort the games alphabetically based on the title
        const sortedGames = gamesResponse.data["$values"].sort((a, b) => a.title.localeCompare(b.title));
        setGames(sortedGames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData();
  }, []);

  // Function to handle category selection
const handleCategoryChange = (event) => {
  const selectedCategory = event.target.value;

  // Update state with the selected category
  setSelectedCategory(selectedCategory);
};

return (
  <div>
    <h1>Games List</h1>
    <div>
      <label htmlFor="category">Select a category: </label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="All categories">All categories</option>
        {availableCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
    <ul>
      {games
        .filter((game) =>
          selectedCategory === 'All categories' ||
          (game.gameCategories &&
            game.gameCategories["$values"]
              .map((category) => category.category.name)
              .includes(selectedCategory))
        )
        .map((game) => (
          <li key={game.gameId}>
            <Link to={`/gamesview/${game.gameId}`} onClick={() => console.log('Clicked Game:', game.gameId)}>
              {game.title}
            </Link>
          </li>
        ))}
    </ul>
  </div>
);
};

export default GamesView;



