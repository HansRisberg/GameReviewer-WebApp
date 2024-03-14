import axios from 'axios';
//Base url for the production database.
const BASE_URL = 'https://localhost:7168/api'; 

const api = axios.create({
  baseURL: BASE_URL,
});
//Exporting the CRUD opperations need for the different components. 
export const getGame = (id) => api.get(`/games/${id}`);                          //GameDetail.js
export const getGames = () => api.get('/games');                                 //GameListComponent.js
export const createGame = (newGame) => api.post('/games/add-game', newGame);     //GameForm.js
export const getGenres = () =>api.get('/genres');                                //GameCategoryComponent.js
export const createUser = (userData) => api.post('/account/register', userData); // RegistrationForm
export const loginUser = (loginData) => api.post('/account/login', loginData);   // LoginForm


// Add more API calls as needed

export default api;