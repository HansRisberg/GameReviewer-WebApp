import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GamesCategoryComponent = ({ onCategoryChange }) => {
  const [availableCategories, setAvailableCategories] = useState(['All categories']);
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of categories
        const categoriesResponse = await axios.get('https://localhost:7168/api/Categories/');
        console.log('Categories API Response:', categoriesResponse.data);

        // Extract unique categories from the categories data
        const categoriesArray = categoriesResponse.data["$values"] || categoriesResponse.data;
        const categories = Array.isArray(categoriesArray) ? categoriesArray.map((category) => category.name) : [];

        console.log('Available Categories:', categories);
        setAvailableCategories(['All categories', ...categories]); // Update state with initial and fetched categories
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle category selection
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    console.log('Selected Category:', selectedCategory);

    // Update state with the selected category
    setSelectedCategory(selectedCategory);

    // Notify the parent component about the category change
    onCategoryChange(selectedCategory);
  };

  return (
    <div>
      <label htmlFor="category">Select a category: </label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        {availableCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GamesCategoryComponent;


