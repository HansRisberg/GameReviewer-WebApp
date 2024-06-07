import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameDetail } from '../Services/Api';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const GameDetailIgdb = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const getGameDetail = async () => {
      try {
        const data = await fetchGameDetail(id);
        console.log('Fetched Game Detail:', data); // Log the fetched data
        setGame(data);
      } catch (error) {
        console.error('Error fetching game detail:', error);
      }
    };

    getGameDetail();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{game.name}</h1>
      <p>{game.summary}</p>
      <p><strong>Storyline:</strong> {game.storyline}</p>
      <p><strong>Category:</strong> {game.category}</p>
      <p><strong>First Release Date:</strong> {new Date(game.first_release_date * 1000).toDateString()}</p>
      {game.genres && <p><strong>Genres:</strong> {game.genres.map(genre => genre.name).join(', ')}</p>}
      {game.platforms && <p><strong>Platforms:</strong> {game.platforms.join(', ')}</p>}
      {game.game_modes && <p><strong>Game Modes:</strong> {game.game_modes.join(', ')}</p>}
      {game.similar_games && <p><strong>Similar Games:</strong> {game.similar_games.join(', ')}</p>}
      {game.involved_companies && (
        <p><strong>Involved Companies:</strong> {game.involved_companies.map(company => company.company.name).join(', ')}</p>
      )}
      {game.external_games && <p><strong>External Games:</strong> {game.external_games.join(', ')}</p>}
      {game.tags && <p><strong>Tags:</strong> {game.tags.join(', ')}</p>}
      {game.keywords && <p><strong>Keywords:</strong> {game.keywords.map(keyword => keyword.name).join(', ')}</p>}
      {game.url && <p><strong>Website:</strong> <a href={game.url} target="_blank" rel="noopener noreferrer">{game.url}</a></p>}
      <p><strong>Updated At:</strong> {new Date(game.updated_at * 1000).toDateString()}</p>
      <div>
          <ScreenshotCarousel screenshots={game.screenshots || []} /> {/* Pass the screenshots array */}
      </div>
    </div>
  );
};

export default GameDetailIgdb;

const ScreenshotCarousel = ({ screenshots }) => {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // Check if screenshots array is empty or undefined
  if (!screenshots || screenshots.length === 0) {
    return <div>No screenshots available</div>;
  }

  return (
    <div className="outer-carousel-container"> {/* Outer container to ensure centering */}
      <div className="carousel-container"> {/* Inner container for carousel */}
        <Carousel cycleNavigation>
          {screenshots.map((screenshot) => (
            <Paper key={screenshot.id} style={{ display: imagesLoaded === screenshots.length ? 'block' : 'none' }}>
              <img
                src={`https:${screenshot.url.replace('t_thumb', 't_screenshot_big')}`}
                alt="Screenshot"
                className="carousel-image" /* Styling for the carousel image */
                onLoad={handleImageLoad}
              />
            </Paper>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
