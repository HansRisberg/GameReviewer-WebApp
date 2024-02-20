import React, { useState } from 'react';

const GameForm = ({ onAddGame }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data if needed

    // Create a new game object
    const newGame = { title };

    // Invoke the callback function to add the new game
    onAddGame(newGame);

    // Clear the form
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Game Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <button type="submit">Add Game</button>
    </form>
  );
};

export default GameForm;
