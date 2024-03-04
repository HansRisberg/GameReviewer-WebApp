//#region Pre-material UI code 
// import React, { useState } from 'react';
// import { createGame } from '../Services/Api';
// KEEP THIS CODE SNIPPET IF YOU WANT TO REVERT TO PRE-MATERIAL UI.

// const GameForm = () => {
//   const [title, setTitle] = useState('');
//   const [releaseDate, setReleaseDate] = useState('');
//   const [selectedPgRating, setSelectedPgRating] = useState('');
//   const [categoryName, setCategoryName] = useState('');

//   const handleAddGame = async (e) => {
//     e.preventDefault();

//     // Validate form data if needed
//       if (!title.trim()) {
//       alert('Game Title is required'); // You can use a more sophisticated validation UI here
//       return;
//     }


//     // Create a new game object
//     const newGame = {
//       title: title,
//       releaseDate: releaseDate,
//       pgRating: selectedPgRating,  // Send pgRating as a string
//       categoryName: categoryName // Add category name
//     };

//     try {
//       const response = await createGame(newGame);
//       // Handle the response as needed
//       console.log('Game added:', response.data);
//       // Clear the form
//       setTitle('');
//       setReleaseDate('');
//       setSelectedPgRating('');
//       setCategoryName('');  // Clear or reset the category name
//     } catch (error) {
//       console.error('Error adding game:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Add Game</h1>
//       <form onSubmit={handleAddGame}>
//         <label>
//           Game Title:
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//         </label>
//         <label>
//           Release Date:
//           <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
//         </label>
//         <label>
//           PG Rating:
//           <select value={selectedPgRating} onChange={(e) => setSelectedPgRating(e.target.value)}>
//             <option value="">Select PG Rating</option>
//             <option value="G">G</option>
//             <option value="PG">PG</option>
//             <option value="M">M</option>
//             <option value="R13">R13</option>
//             <option value="R16">R16</option>
//             <option value="R18">R18</option>
//           </select>
//         </label>
//         <label>
//           Category Name:
//           <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
//         </label>
//         <button type="submit">Add Game</button>
//       </form>
//     </div>
//   );
// };

// export default GameForm;
//#endregion

// GameForm.js

import React, { useState } from 'react';
import { createGame } from '../Services/Api';
import { FormControl, MenuItem } from '@mui/material';
import { StyledFormContainer, StyledLabel, StyledTextField, StyledButton, StyledSelect } from '../Styles/GameFormStyles'; 

const GameForm = () => {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [selectedPgRating, setSelectedPgRating] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const handleAddGame = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Game Title is required');
      return;
    }

    const newGame = {
      title: title,
      releaseDate: releaseDate,
      pgRating: selectedPgRating,
      categoryName: categoryName,
    };

    try {
      const response = await createGame(newGame);
      console.log('Game added:', response.data);
      setTitle('');
      setReleaseDate('');
      setSelectedPgRating('');
      setCategoryName('');
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
          <StyledLabel>Category Name</StyledLabel>
          <StyledTextField
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </FormControl>

        <StyledButton type="submit">Add Game</StyledButton>
      </form>
    </StyledFormContainer>
  );
};

export default GameForm;




