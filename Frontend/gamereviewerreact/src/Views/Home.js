// Home.js (VIEW)

import React from 'react';
import GameCarousel from '../Components/GameCarousel';
import RegistrationForm from '../Components/RegistrationForm';

const home = () => {
  return (
    <div>
      <RegistrationForm />
      <GameCarousel /> {/* Render the component here */}
    </div>
  );
};

export default home;