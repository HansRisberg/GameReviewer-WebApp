import React, { useState } from 'react';

const GameForm = ({ onGameAdded }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data if needed

    // Create a new game object
    const newGame = { title };

    // Invoke the callback function to add the new game
    onGameAdded(newGame);

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



// import React, { useState, useEffect } from 'react';
// import { getAvailablePGRatings, getAvailableCategories } from '../Services/Api';

// const GameForm = ({ onAddGame }) => {
//   const [title, setTitle] = useState('');
//   const [releaseDate, setReleaseDate] = useState('');
//   const [selectedPGRating, setSelectedPGRating] = useState('');
//   const [availablePGRatings, setAvailablePGRatings] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [availableCategories, setAvailableCategories] = useState([]);

//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const pgRatings = await getAvailablePGRatings();
//         const categories = await getAvailableCategories();
        
//         // Ensure pgRatings and categories are arrays before setting state
//         if (Array.isArray(pgRatings)) {
//           setAvailablePGRatings(pgRatings);
//         }

//         if (Array.isArray(categories)) {
//           setAvailableCategories(categories);
//         }
//       } catch (error) {
//         console.error('Error fetching options:', error);
//       }
//     };

//     fetchOptions();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newGame = {
//       title,
//       releaseDate,
//       pgRating: selectedPGRating,
//       categories: selectedCategories,
//     };

//     onAddGame(newGame);

//     setTitle('');
//     setReleaseDate('');
//     setSelectedPGRating('');
//     setSelectedCategories([]);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Game Title:
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//       </label>
//       <label>
//         Release Date:
//         <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
//       </label>
//       <label>
//         PG Rating:
//         <select value={selectedPGRating} onChange={(e) => setSelectedPGRating(e.target.value)}>
//           <option value="">Select PG Rating</option>
//           {Array.isArray(availablePGRatings) &&
//             availablePGRatings.map((rating) => (
//               <option key={rating} value={rating}>
//                 {rating}
//               </option>
//             ))}
//         </select>
//       </label>
//       <label>
//         Categories:
//         <select
//           multiple
//           value={selectedCategories}
//           onChange={(e) =>
//             setSelectedCategories(Array.from(e.target.selectedOptions, (option) => option.value))
//           }
//         >
//           {Array.isArray(availableCategories) &&
//             availableCategories.map((category) => (
//               <option key={category.categoryId} value={category.categoryId}>
//                 {category.name}
//               </option>
//             ))}
//         </select>
//       </label>
//       <button type="submit">Add Game</button>
//     </form>
//   );
// };

// export default GameForm;

       


