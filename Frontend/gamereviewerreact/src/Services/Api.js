import axios from 'axios';

// Base URL for the API. Adjust for production and development environments as needed.
//  const BASE_URL = 'https://localhost:7168/api';
 const BASE_URL = 'https://gamereviewerbackendapi.azurewebsites.net/api';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ensure the token is correct
    console.log('Retrieved token in interceptor:', token); // Confirm the correct token is retrieved
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Export CRUD operations for different components
export const getGame = (id) => api.get(`/games/${id}`); // For GameDetail
export const getGames = () => api.get('/games'); // For GameListComponent
export const createGame = (newGame) => api.post('/games/add-game', newGame); // For GameForm
export const getGenres = () => api.get('/genres'); // For GameGenresComponent
export const createUser = (userData) => api.post('/account/register', userData); // For RegistrationForm
export const getAllReviews = () => api.get('/reviews');
// export const fetchUserReviews = (id) => api.get(`/reviews/${id}`)
export const fetchUserReviews = () => api.get('/reviews/user-reviews');

export const loginUser = async (loginData) => {
  const response = await api.post('/account/login', loginData); // Use the correct Axios instance
  const { token } = response.data;
  console.log('Storing token:', token); // Log to confirm the token is stored
  localStorage.setItem('token', token); // Store the token in localStorage
  console.log('Token stored in localStorage:', localStorage.getItem('token'));
  return response;
};

export const logoutUser = () => api.post('/account/logout'); // AuthContext.js

export const getProfile = () => {
  const token = localStorage.getItem('token');
  return api.get('/account/profile/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
