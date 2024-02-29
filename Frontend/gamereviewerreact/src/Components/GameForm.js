import React, { useState } from 'react';
import { createGame } from '../Services/Api';

const GameForm = () => {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [selectedPgRating, setSelectedPgRating] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const handleAddGame = async (e) => {
    e.preventDefault();

    // Validate form data if needed
      if (!title.trim()) {
      alert('Game Title is required'); // You can use a more sophisticated validation UI here
      return;
    }


    // Create a new game object
    const newGame = {
      title: title,
      releaseDate: releaseDate,
      pgRating: selectedPgRating,  // Send pgRating as a string
      categoryName: categoryName // Add category name
    };

    try {
      const response = await createGame(newGame);
      // Handle the response as needed
      console.log('Game added:', response.data);
      // Clear the form
      setTitle('');
      setReleaseDate('');
      setSelectedPgRating('');
      setCategoryName('');  // Clear or reset the category name
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div>
      <h1>Add Game</h1>
      <form onSubmit={handleAddGame}>
        <label>
          Game Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Release Date:
          <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
        </label>
        <label>
          PG Rating:
          <select value={selectedPgRating} onChange={(e) => setSelectedPgRating(e.target.value)}>
            <option value="">Select PG Rating</option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="M">M</option>
            <option value="R13">R13</option>
            <option value="R16">R16</option>
            <option value="R18">R18</option>
          </select>
        </label>
        <label>
          Category Name:
          <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </label>
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
};

export default GameForm;










