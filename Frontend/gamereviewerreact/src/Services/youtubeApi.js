import axios from 'axios';

const fetchYouTubeTrailer = async (gameTitle, apiKey) => {
  try {
    // Make a request to the YouTube API to search for the game title and retrieve video ID
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${gameTitle} game trailer&type=video&key=${apiKey}`
    );

    // Extract the video ID from the API response
    const videoId = response.data.items[0]?.id.videoId;

    return videoId;
  } catch (error) {
    console.error('Error fetching YouTube trailer:', error);
    return null;
  }
};

export default fetchYouTubeTrailer;

