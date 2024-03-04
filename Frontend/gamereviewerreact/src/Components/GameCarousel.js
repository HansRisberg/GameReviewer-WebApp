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
    <Carousel cycleNavigation>
      {gamesData.map((game) => (
        <Paper key={game.title}>
          {/* Remove the Typography component to hide the title */}
          {/* <Typography variant="h5">{game.title}</Typography> */}
          <img src={game.imageUrl} alt={game.title} style={{ width: '100%', height: 'auto' }} />
        </Paper>
      ))}
    </Carousel>
  );
};

export default GameCarousel;

  