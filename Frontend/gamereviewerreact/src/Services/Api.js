import axios from 'axios';

const BASE_URL = 'https://localhost:7168/api'; 

const api = axios.create({
  baseURL: BASE_URL,
});

export const getGame = (id) => api.get(`/games/${id}`);
export const getGames = () => api.get('/games');
export const createGame = (newGame) => api.post('/games', newGame);
export const getCategories = () =>api.get('/categories');
// Add more API calls as needed

export default api;