import React from 'react';
import GameCarousel from '../Components/GameCarousel';
import '../CSS/Home.css'; /* Apply a CSS file for styling */
import { ReviewsList } from '../Components/ReviewsList';

const Home = () => {
  return (
    <div className="home-container"> {/* Apply a class for styling */}
      <GameCarousel /> {/* Render the carousel component */}

      <div className="home-section"> {/* Section for explanatory text */}
        <h2>Welcome to Game Reviewer</h2> {/* Example heading */}
        <p>Discover the latest and greatest games, read reviews, and share your opinions with our community.</p> {/* Example paragraph */}
        <ReviewsList />
      </div>
    </div>
  );
};

export default Home;
