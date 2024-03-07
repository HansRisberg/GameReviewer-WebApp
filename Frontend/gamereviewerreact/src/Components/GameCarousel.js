import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const gamesData = [
  { title: 'Baldurs Gate 3', imageUrl: '/Assets/bg3.webp' },
  { title: 'Warhammer40k Darktide', imageUrl: '/Assets/darktide2.webp' },
  // Add more images
];

const GameCarousel = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  return (
    <div style={{ marginTop: '-40px', position: 'relative', zIndex: '-1' }}>
      <Carousel cycleNavigation>
        {gamesData.map((game) => (
          <Paper key={game.title} style={{ display: imagesLoaded === gamesData.length ? 'block' : 'none' }}>
            <img
              src={game.imageUrl}
              alt={game.title}
              style={{ width: '100%', height: 'auto' }}
              onLoad={handleImageLoad}
            />
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default GameCarousel;


