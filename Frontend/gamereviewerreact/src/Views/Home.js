// Home.js (VIEW)

import React from 'react';
import GameCarousel from '../Components/GameCarousel';
import LoginForm from '../Components/LoginForm';


const home = () => {
  return (
    <div>
      
      <GameCarousel /> {/* Render the component here */}
      <LoginForm />
    </div>
  );
};

export default home;