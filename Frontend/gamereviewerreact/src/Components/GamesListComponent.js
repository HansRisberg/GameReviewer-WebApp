// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const GamesListComponent = ({ selectedGenre }) => {
//   const [games, setGames] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // const url = selectedGenre === 'All genres'
//         //   ? 'https://localhost:7168/api/Games/'
//         //   : `https://localhost:7168/api/Games?genre=${encodeURIComponent(selectedGenre)}`;
//           const url = selectedGenre === 'All genres'
//           ? 'https://gamereviewerbackendapi.azurewebsites.net/api/Games/'
//           : `https://gamereviewerbackendapi.azurewebsites.net/api/Games?genre=${encodeURIComponent(selectedGenre)}`;

//         console.log('API Request URL:', url);

//         const gamesResponse = await axios.get(url);

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

//         //Sorting list
//         flatGames.sort((a, b) => a.title.localeCompare(b.title));
//         setGames(flatGames);
//         console.log('Games Response:', gamesResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [selectedGenre]);

//   return (
//     <div>
//       <h1>Games List</h1>
//       <ul>
//         {games.map((game) => (
//           <li key={game.gameId}>
//             <Link to={`/gamesview/${game.gameId}`} onClick={() => console.log('Clicked Game:', game.gameId)}>
//               {game.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default GamesListComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/GamesListComponent.css'; // Import the CSS file for flexbox styling

const GamesListComponent = ({ selectedGenre }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = selectedGenre === 'All genres'
          ? 'https://gamereviewerbackendapi.azurewebsites.net/api/Games/'
          : `https://gamereviewerbackendapi.azurewebsites.net/api/Games?genre=${encodeURIComponent(selectedGenre)}`;
          
          // ? 'https://localhost:7168/api/Games/'
          // : `https://localhost:7168/api/Games?genre=${encodeURIComponent(selectedGenre)}`;

        console.log('API Request URL:', url);

        const gamesResponse = await axios.get(url);

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

        // Sort games alphabetically
        flatGames.sort((a, b) => a.title.localeCompare(b.title));
        setGames(flatGames);
        console.log('Games Response:', gamesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedGenre]);

  // Group games by their starting letter
  const groupedGames = games.reduce((acc, game) => {
    const firstLetter = game.title[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(game);
    return acc;
  }, {});

  return (
    <div>
      <h1>Games List</h1>
      <div className="games-container">
        {Object.keys(groupedGames).sort().map((letter) => (
          <div key={letter} className="games-section">
            <h2>{letter}</h2>
            <div className="games-list">
              {groupedGames[letter].map((game) => (
                <div key={game.gameId} className="game-card">
                  <Link to={`/gamesview/${game.gameId}`} onClick={() => console.log('Clicked Game:', game.gameId)}>
                    {game.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesListComponent;
