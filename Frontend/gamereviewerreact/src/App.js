import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Home from './Views/Home';
import ReviewsView from './Views/ReviewsView';
import GamesView from './Views/GamesView';
import GameDetailView from './Views/GameDetailView';
import AddGameView from './Views/AddGameView';


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
          <Route path="/addgameview/" element={<AddGameView />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


