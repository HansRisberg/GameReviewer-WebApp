import axios from 'axios';

const BASE_URL = 'https://localhost:7168/api'; 

const api = axios.create({
  baseURL: BASE_URL,
});

export const getGames = () => api.get('/games');
export const createGame = (newGame) => api.post('/games', newGame);
export const getAvailablePGRatings = () => api.get('/games/pgratings');
export const getAvailableCategories = () => api.get('/categories');
// Add more API calls as needed

export default api;