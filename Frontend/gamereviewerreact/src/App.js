// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Home from './Views/Home';
import ReviewsView from './Views/ReviewsView';
import GamesView from './Views/GamesView';
import GameDetailView from './Views/GameDetailView';
import AddGameView from './Views/AddGameView';
import { ThemeProviderWrapper } from './Styles/GameFormStyles';
import LoginView from './Views/LogIn';
import RegisterView from './Views/Registration';

const App = () => {
  return (
    <ThemeProviderWrapper>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gamesview" element={<GamesView />} />
            <Route path="/reviewsview" element={<ReviewsView />} />
            <Route path="/gamesview/:id" element={<GameDetailView />} />
            <Route path="/addgameview/" element={<AddGameView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/registration" element={<RegisterView />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </ThemeProviderWrapper>
  );
};

export default App;


