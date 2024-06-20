import React from 'react';
import GameCarousel from '../Components/GameCarousel';
import '../CSS/Home.css';
import { ReviewsList } from '../Components/ReviewsList';

const Home = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Welcome to Game Reviewer</h2>
      <h3 style={{ textAlign: 'center', color: 'red' }}>!! If the App has been dormant for 20 min, It needs about 20-30 seconds to start up. This is because of Azures free hosting policy</h3>
      <div className="home-container">
        <div className="carousel_infoCard-container">
          <h3 className="info-container1" > Discover the ultimate gaming companion with our app! Seamlessly explore a vast array of games using the IGDB database, ensuring you never miss out on the latest hits or hidden gems. Effortlessly search for your favorite titles and uncover new adventures. Share your gaming experiences by writing detailed reviews and reading others' insights. Expand our database by adding new games, making our platform richer for everyone. Create a user account to personalize your experience, track your reviews, and contribute to the gaming community. Dive into a world of endless gaming possibilities with our "intuitive" and comprehensive app!</h3>
          <GameCarousel />
          <h3 className="info-container2" > Discover the ultimate gaming companion with our app! Seamlessly explore a vast array of games using the IGDB database, ensuring you never miss out on the latest hits or hidden gems. Effortlessly search for your favorite titles and uncover new adventures. Share your gaming experiences by writing detailed reviews and reading others' insights. Expand our database by adding new games, making our platform richer for everyone. Create a user account to personalize your experience, track your reviews, and contribute to the gaming community. Dive into a world of endless gaming possibilities with our intuitive and comprehensive app!</h3>
        </div>

        <div className="home-section">
          <ReviewsList />
        </div>
      </div>
    </div>
  );
};

export default Home;
