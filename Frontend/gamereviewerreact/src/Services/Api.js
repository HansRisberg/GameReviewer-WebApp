// import axios from 'axios';

// // Base URL for the production database.
// const BASE_URL = 'https://localhost:7168/api';

// // Create an Axios instance
// const api = axios.create({
//   baseURL: BASE_URL,
// });
// const getToken = () => localStorage.getItem('token');

// // Export CRUD operations needed for different components
// export const getGame = (id) => api.get(`/games/${id}`); // GameDetail.js
// export const getGames = () => api.get('/games'); // GameListComponent.js
// export const createGame = (newGame) => api.post('/games/add-game', newGame); // GameForm.js
// export const getGenres = () => api.get('/genres'); // GameCategoryComponent.js
// export const createUser = (userData) => api.post('/account/register', userData); // RegistrationForm.js
// export const 
// export const loginUser = async (loginData) => {
//   // Make a request to login endpoint
//   const response = await api.post('/account/login', loginData);
//   // Extract the token from the response data
//   const { token: newToken } = response.data;
//   // Store the token in localStorage
//   localStorage.setItem('token', newToken);
//   return response;
// };
// export const logoutUser = () => api.post('/account/logout'); // AuthContext.js
// export const getProfile = () => {
//   console.log('Getting token before retrieval');
//   const token = getToken(); // Retrieve the token from localStorage
  
//   console.log('Token after retrieval:', token);

//   return api.get(`/account/profile/`, {
//       headers: {
//           Authorization: `Bearer ${token}`,
//       },
//   });
// };
// // ProfilePage.js

// // Add more API calls as needed

// export default api;

import axios from 'axios';

// Base URL for the API. Adjust for production and development environments as needed.
const BASE_URL = 'https://localhost:7168/api';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: BASE_URL,
});

// Function to get the JWT token from localStorage
const getToken = () => localStorage.getItem('token');

// Interceptor to add Authorization header with JWT token to all requests, if token is available
api.interceptors.request.use(
  (config) => {
    const token = getToken(); // Retrieve the JWT token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config; // Return the updated config
  },
  (error) => Promise.reject(error) // Handle errors in the interceptor
);

// Export CRUD operations for different components
export const getGame = (id) => api.get(`/games/${id}`); // For GameDetail
export const getGames = () => api.get('/games'); // For GameListComponent
export const createGame = (newGame) => api.post('/games/add-game', newGame); // For GameForm
export const getGenres = () => api.get('/genres'); // For GameCategoryComponent
export const createUser = (userData) => api.post('/account/register', userData); // For RegistrationForm

export const loginUser = async (loginData) => {
  // Send a POST request to the login endpoint
  const response = await api.post('/account/login', loginData);
  // Extract the token from the response data
  const { token: newToken } = response.data;
  // Store the token in localStorage
  localStorage.setItem('token', newToken);
  return response; // Return the full response
};

export const logoutUser = () => api.post('/account/logout'); // AuthContext.js

export const getProfile = () => {
  return api.get(`/account/profile/`); // The interceptor will add the token
};

// New function to add a review for a specific game
export const addReview = (gameId, reviewContent) => {
  return api.post('/reviews/add', {
    gameId,
    reviewContent,
  }); // The interceptor will add the token
};

// Export the Axios instance for general use
export default api;
