import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GameDetail = () => {
  const [game, setGame] = useState([]);
  //const [gameCategories, setGameCategories] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameResponse = await axios.get(`https://localhost:7168/api/Games/${id}`);
        console.log('Game Detail Response:', gameResponse.data);
        setGame(gameResponse.data);
      } catch (error) {
        console.error(`Error fetching game details or categories for ID ${id}:`, error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{game.title}</h2>
      <p>ID: {game.gameId}</p>
      <p>Categories: {game.gameCategories && game.gameCategories.$values
          ? game.gameCategories.$values.map(category => category.category.name).join(', ')
          : 'No categories'}</p>
      <p>Release Date: {game.releaseDate}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default GameDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const GameDetail = () => {
//   const [game, setGame] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch game details
//         const gameResponse = await axios.get(`https://localhost:7168/api/Games/${id}`);
//         console.log('Game Detail Response:', gameResponse.data);

//         // Check if the "value" property exists
//         if (gameResponse.data.hasOwnProperty('$values')) {
//           setGame(gameResponse.data.$values[0]);

//           // Extract categories from the nested structure
//           const nestedCategories = gameResponse.data.$values[0]?.gameCategories?.$values || [];
//           setCategories(nestedCategories);

//           // Log the categories data
//           console.log('Categories Data:', nestedCategories);
//         } else {
//           console.error('Error: "$values" property is missing in the response.');
//         }
//       } catch (error) {
//         console.error(`Error fetching game details or categories for ID ${id}:`, error);
//       }
//     };

//     // Check if id is defined before making the API call
//     if (id) {
//       fetchData();
//     }
//   }, [id]);

//   if (!game) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{game.title}</h2>
//       <p>ID: {game.gameId}</p>
//       <p>Categories:</p>
//       <ul>
//         {categories.map((category) => (
//           <li key={category.categoryId}>{category.name}</li>
//         ))}
//       </ul>
//       <p>Release Date: {game.releaseDate}</p>
//       {/* Add more details as needed */}
//     </div>
//   );
// };

// export default GameDetail;