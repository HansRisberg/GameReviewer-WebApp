// import React, { useState } from 'react';
// import { createGame } from '../Services/Api';
// import { FormControl, MenuItem } from '@mui/material';
// import { StyledFormContainer, StyledLabel, StyledTextField, StyledButton, StyledSelect } from '../Styles/GameFormStyles'; 

// const GameForm = () => {
//   const [title, setTitle] = useState('');
//   const [releaseDate, setReleaseDate] = useState('');
//   const [selectedPgRating, setSelectedPgRating] = useState('');
//   const [categoryName, setCategoryName] = useState('');

//   const handleAddGame = async (e) => {
//     e.preventDefault();

//     if (!title.trim()) {
//       alert('Game Title is required');
//       return;
//     }

//     const newGame = {
//       title: title,
//       releaseDate: releaseDate,
//       pgRating: selectedPgRating,
//       categoryName: categoryName,
//     };

//     try {
//       const response = await createGame(newGame);
//       console.log('Game added:', response.data);
//       setTitle('');
//       setReleaseDate('');
//       setSelectedPgRating('');
//       setCategoryName('');
//     } catch (error) {
//       console.error('Error adding game:', error);
//     }
//   };

//   return (
//     <StyledFormContainer>
//       <h1>Add Game</h1>
//       <form onSubmit={handleAddGame}>
//         <FormControl fullWidth>
//           <StyledLabel>Game Title</StyledLabel>
//           <StyledTextField
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </FormControl>

//         <FormControl fullWidth>
//           <StyledLabel>Release Date</StyledLabel>
//           <StyledTextField
//             type="date"
//             value={releaseDate}
//             onChange={(e) => setReleaseDate(e.target.value)}
//           />
//         </FormControl>

//         <FormControl fullWidth>
//           <StyledLabel>PG Rating</StyledLabel>
//           <StyledSelect
//             value={selectedPgRating}
//             onChange={(e) => setSelectedPgRating(e.target.value)}
//           >
//             <MenuItem value="">Select PG Rating</MenuItem>
//             <MenuItem value="G">G</MenuItem>
//             <MenuItem value="PG">PG</MenuItem>
//             <MenuItem value="M">M</MenuItem>
//             <MenuItem value="R13">R13</MenuItem>
//             <MenuItem value="R16">R16</MenuItem>
//             <MenuItem value="R18">R18</MenuItem>
//           </StyledSelect>
//         </FormControl>

//         <FormControl fullWidth>
//           <StyledLabel>Category Name</StyledLabel>
//           <StyledTextField
//             type="text"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//           />
//         </FormControl>

//         <StyledButton type="submit">Add Game</StyledButton>
//       </form>
//     </StyledFormContainer>
//   );
// };

// export default GameForm;

import React, { useState, useEffect } from 'react';
import { createGame, getCategories } from '../Services/Api';
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categoriesData = response.data?.$values || []; // Extract $values property
        console.log('Fetched Categories:', categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

  const handleAddGame = async (e) => {
    e.preventDefault();

    if (!title.trim() || selectedCategories.length === 0) {
      alert('Game Title and at least one Category are required');
      return;
    }

    const newGame = {
      title: title,
      releaseDate: releaseDate,
      pgRating: selectedPgRating,
      categories: selectedCategories,
    };

    try {
      const response = await createGame(newGame);
      console.log('Game added:', response.data);
      setTitle('');
      setReleaseDate('');
      setSelectedPgRating('');
      setSelectedCategories([]);
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
          <StyledLabel>Categories</StyledLabel>
          <StyledSelect
            multiple
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.categoryId} value={category.name}>
                {category.name}
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

