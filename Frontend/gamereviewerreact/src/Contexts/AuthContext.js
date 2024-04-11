import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Perform login logic (e.g., set isLoggedIn to true)
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      // Send a request to the server to invalidate the user's session
      await axios.post('https://localhost:7168/api/account/logout');
      
      // Clear any client-side authentication tokens or session data
      setIsLoggedIn(false);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout failure
    }
  };

  // Log when isLoggedIn state changes
  React.useEffect(() => {
    console.log('isLoggedIn changed:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

 export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null);

//   const login = () => {
//     // Perform login logic (e.g., set isLoggedIn to true)
//     setIsLoggedIn(true);
//   };

//   const logout = async () => {
//     try {
//       // Send a request to the server to invalidate the user's session
//       await axios.post('https://localhost:7168/api/account/logout');
      
//       // Clear any client-side authentication tokens or session data
//       setIsLoggedIn(false);
//       setUserId(null); // Reset userId
//       console.log('User logged out successfully');
//     } catch (error) {
//       console.error('Logout failed:', error);
//       // Handle logout failure
//     }
//   };

//   // Fetch the current user's ID when the component mounts
//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const response = await axios.get('https://localhost:7168/api/account/profile');
//         setUserId(response.data.id);
//       } catch (error) {
//         console.error('Error fetching user ID:', error);
//       }
//     };

//     fetchUserId();
//   }, []);

//   // Log when isLoggedIn state changes
//   useEffect(() => {
//     console.log('isLoggedIn changed:', isLoggedIn);
//   }, [isLoggedIn]);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



