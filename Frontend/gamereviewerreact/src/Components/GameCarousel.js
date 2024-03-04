import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const gamesData = [
  { title: 'Baldurs Gate 3', imageUrl: '/Assets/bg3.webp' },
  { title: 'Warhammer40k Darktide', imageUrl: '/Assets/darktide2.webp' },
  // Add more game data as needed
];

const GameCarousel = () => {
    return (
      <div style={{ marginTop: '-40px' , position: 'relative', zIndex: '-1' }}> {/* Apply negative margin for overlap */}
        <Carousel cycleNavigation>
          {gamesData.map((game) => (
            <Paper key={game.title}>
              <img src={game.imageUrl} alt={game.title} style={{ width: '100%', height: 'auto' }} />
            </Paper>
          ))}
        </Carousel>
      </div>
    );
  };
  
  export default GameCarousel;

  