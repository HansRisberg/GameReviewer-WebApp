// import React from 'react';
// import GameList from './Components/GameList';

// const App = () => {
//   return (
//     <div className='App'>
//       <h1>Game Reviewer App</h1>
//       <GameList />
//     </div>
//   );
// };

// export default App;

// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Home from './Views/Home';
import ReviewsView from './Views/ReviewsView';
import GamesView from './Views/GamesView';
import GameDetailView from './Views/GameDetailView';


const App = () => {
  return (
    <Router>
      <div>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gamesview" element={<GamesView />} />
          <Route path="/reviewsview" element={<ReviewsView />} />
          <Route path="/gamesview/:id" element={<GameDetailView />} /> 
          {/* <Route path="/games/:id" element={<GameDetail />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


