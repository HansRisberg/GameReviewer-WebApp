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
import Games from './Views/Games';
import Reviews from './Views/Reviews';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/reviews" element={<Reviews />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


