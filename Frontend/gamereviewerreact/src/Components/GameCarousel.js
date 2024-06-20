import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import '../CSS/Carousel.css';

const gamesData = [
  { title: 'Baldurs Gate 3', imageUrl: '/Assets/bg3.webp' },
  { title: 'Warhammer40k Darktide', imageUrl: '/Assets/darktide2.webp' },
  { title: 'Enshrouded', imageUrl: '/Assets/enshrouded.webp' },
 
];

const GameCarousel = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  return (
    <div className="outer-carousel-container"> 
      <div className="carousel-container"> 
        <Carousel cycleNavigation>
          {gamesData.map((game) => (
            <Paper key={game.title} style={{ display: imagesLoaded === gamesData.length ? 'block' : 'none' }}>
              <img
                src={game.imageUrl}
                alt={game.title}
                className="carousel-image" 
                onLoad={handleImageLoad}
              />
            </Paper>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default GameCarousel;
