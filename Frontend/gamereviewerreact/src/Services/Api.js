import axios from 'axios';
//Base url for the production database.
const BASE_URL = 'https://localhost:7168/api'; 

const api = axios.create({
  baseURL: BASE_URL,
});
//Exporting the CRUD opperations need for the different components. 
export const getGame = (id) => api.get(`/games/${id}`);
export const getGames = () => api.get('/games');
export const createGame = (newGame) => api.post('/games', newGame); //Not in use atm
export const getCategories = () =>api.get('/categories'); // Not in use atm
// Add more API calls as needed

export default api;