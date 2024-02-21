import axios from 'axios';

const BASE_URL = 'https://localhost:7168/api'; 

const api = axios.create({
  baseURL: BASE_URL,
});

export const getGames = () => api.get('/games');
export const createGame = (newGame) => api.post('/games', newGame);
// Add more API calls as needed

export default api;