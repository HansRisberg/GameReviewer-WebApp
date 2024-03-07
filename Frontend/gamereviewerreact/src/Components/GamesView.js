// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const GamesView = () => {
//   const [games, setGames] = useState([]);
//   const [availableCategories, setAvailableCategories] = useState(['All categories']); // Set an initial value
//   const [selectedCategory, setSelectedCategory] = useState('All categories');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch the list of games
//         const gamesResponse = await axios.get('https://localhost:7168/api/Games/');
//         console.log('Games API Response:', gamesResponse.data);

//         // Fetch the list of categories
//         const categoriesResponse = await axios.get('https://localhost:7168/api/Categories/');
//         console.log('Categories API Response:', categoriesResponse.data);

//         // Extract unique categories from the categories data
//         const categoriesArray = categoriesResponse.data["$values"] || categoriesResponse.data;

//         const categories = Array.isArray(categoriesArray)
//           ? categoriesArray.map((category) => category.name)
//           : [];

//         console.log('Available Categories:', categories);
//         setAvailableCategories(['All categories', ...categories]); // Update state with initial and fetched categories

//         // Flatten the gameCategories to get all categories in a single array
//         const allCategories = gamesResponse.data["$values"]
//           .flatMap((game) =>
//             game.gameCategories && game.gameCategories["$values"]
//               ? game.gameCategories["$values"].map((category) => category.category)
//               : []
//           )
//           .filter((category) => category);

//         // Extract unique categories from the allCategories array
//         const uniqueCategories = Array.from(new Set(allCategories.map((category) => category.name)));

//         // Update the state with unique categories
//         setAvailableCategories(['All categories', ...uniqueCategories]);

//         // Flatten the game data and replace referenced games with actual game data
//         const flatGames = gamesResponse.data["$values"].flatMap((game) => {
//           if (game["$ref"]) {
//             const referencedGame = gamesResponse.data["$values"].find((refGame) => refGame["$id"] === game["$ref"]);
//             if (referencedGame) {
//               return [referencedGame];
//             }
//           }
//           return [game];
//         });

//         // Set games without sorting
//         setGames(flatGames);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to handle category selection
//   const handleCategoryChange = (event) => {
//     const selectedCategory = event.target.value;

//     // Update state with the selected category
//     setSelectedCategory(selectedCategory);
//   };

//   return (
//     <div>
//       <h1>Games List</h1>
//       <div>
//         <label htmlFor="category">Select a category: </label>
//         <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
//           {availableCategories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>
//       <ul>
//         {games
//           .filter((game) =>
//             selectedCategory === 'All categories' ||
//             (game.gameCategories &&
//               game.gameCategories["$values"]
//                 .map((category) => category.category.name)
//                 .includes(selectedCategory))
//           )
//           .map((game) => (
//             <li key={game.gameId}>
//               <Link to={`/gamesview/${game.gameId}`} onClick={() => console.log('Clicked Game:', game.gameId)}>
//                 {game.title}
//               </Link>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default GamesView;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

        // Flatten the game data and replace referenced games with actual game data
        const flatGames = gamesResponse.data["$values"].flatMap((game) => {
          if (game["$ref"]) {
            const referencedGame = gamesResponse.data["$values"].find((refGame) => refGame["$id"] === game["$ref"]);
            if (referencedGame) {
              return [referencedGame];
            }
          }
          return [game];
        });

        // Set games without sorting
        setGames(flatGames);

        // Fetch the list of categories
        const categoriesResponse = await axios.get('https://localhost:7168/api/Categories/');
        console.log('Categories API Response:', categoriesResponse.data);

        // Extract unique categories from the allCategories array
        const uniqueCategories = Array.from(new Set(flatGames
          .flatMap((game) =>
            game.gameCategories && game.gameCategories["$values"]
              ? game.gameCategories["$values"].map((category) => category.category.name)
              : []
          )
          .filter((category) => category)
        ));
        console.log('Available Categories:', uniqueCategories);
        setAvailableCategories(uniqueCategories);
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
              {game.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GamesView;









