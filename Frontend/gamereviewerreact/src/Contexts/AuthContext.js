import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage in AuthProvider:', token);

    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
      console.log('User logged in from localStorage');
    } else {
      setIsLoggedIn(false);
      console.log('No token found in localStorage');
    }
  }, []);

  const login = (token) => {
    console.log('Login in AuthContext with token:', token); // Confirm the token is correct
    localStorage.setItem('token', token); // Store the token in localStorage
    setAuthToken(token); // Set the token in state
    setIsLoggedIn(true); // Set the login state
    console.log('User logged in');
  };

  const logout = async () => {
    try {
      await axios.post('https://gamereviewerbackendapi.azurewebsites.net/api/account/logout');
      localStorage.removeItem('token');
      setAuthToken(null);
      setIsLoggedIn(false);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

