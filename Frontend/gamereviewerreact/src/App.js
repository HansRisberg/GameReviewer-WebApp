// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Home from './Views/Home';
import GamesView from './Views/GamesView';
import GameDetailView from './Views/GameDetailView';
import AddGameView from './Views/AddGameView';

import LoginView from './Views/LogIn';
import RegisterView from './Views/Registration';
import ProfileView from './Views/Profile';
import Footer from './Components/Footer';
import { AuthProvider } from './Contexts/AuthContext';
import { ScrollToTop } from './Components/ScrollToTop';
import { ThemeProviderWrapper } from './Styles/GameFormStyles';

const App = () => {
  return (
    <AuthProvider>
     <ThemeProviderWrapper>
        <Router>
        <ScrollToTop />
          <div>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gamesview" element={<GamesView />} />
              <Route path="/gamesview/:id" element={<GameDetailView />} />
              <Route path="/addgameview/" element={<AddGameView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/registration" element={<RegisterView />} />
              <Route path="/profile" element={<ProfileView />} />
              {/* Add more routes as needed */}
            </Routes>
            <Footer />
          </div>
        </Router>
        </ThemeProviderWrapper>
    </AuthProvider>
  );
};

export default App;


