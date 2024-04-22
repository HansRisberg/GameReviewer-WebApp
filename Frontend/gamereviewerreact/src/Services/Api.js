import axios from 'axios';

// Base URL for the production database.
const BASE_URL = 'https://localhost:7168/api';

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});
const getToken = () => localStorage.getItem('token');

// Export CRUD operations needed for different components
export const getGame = (id) => api.get(`/games/${id}`); // GameDetail.js
export const getGames = () => api.get('/games'); // GameListComponent.js
export const createGame = (newGame) => api.post('/games/add-game', newGame); // GameForm.js
export const getGenres = () => api.get('/genres'); // GameCategoryComponent.js
export const createUser = (userData) => api.post('/account/register', userData); // RegistrationForm.js
export const loginUser = async (loginData) => {
  // Make a request to login endpoint
  const response = await api.post('/account/login', loginData);
  // Extract the token from the response data
  const { token: newToken } = response.data;
  // Store the token in localStorage
  localStorage.setItem('token', newToken);
  return response;
};
export const logoutUser = () => api.post('/account/logout'); // AuthContext.js
export const getProfile = () => {
  console.log('Getting token before retrieval');
  const token = getToken(); // Retrieve the token from localStorage
  
  console.log('Token after retrieval:', token);

  return api.get(`/account/profile/`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
};
// ProfilePage.js

// Add more API calls as needed

export default api;
