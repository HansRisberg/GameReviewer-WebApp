import React, { useState, useEffect } from 'react';
import { getProfile } from '../Services/Api'; // Adjust the import path as needed

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Call getProfile() to fetch user profile data
    getProfile()
      .then(response => {
        // Assuming response.data contains user information
        setUserInfo(response.data);
        console.log('User Info:', response.data); // Log the user info
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h1>Profile Page</h1>
      {userInfo && (
        <div>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

// import React, { useState, useEffect } from 'react';
// import { getProfile } from '../Services/Api'; // Adjust the import path as needed

// const ProfilePage = ({ userId }) => {
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     if (!userId) return; // Check if userId is available

//     Call getProfile() with userId to fetch user profile data
//     getProfile(userId)
//       .then(response => {
//         Assuming response.data contains user information
//         setUserInfo(response.data);
//         console.log('User Info:', response.data); // Log the user info
//       })
//       .catch(error => {
//         console.error('Error fetching user profile:', error);
//       });
//   }, [userId]); // Pass userId as a dependency to the effect

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       {userInfo && (
//         <div>
//           <p>Name: {userInfo.userName}</p> {/* Assuming userName is the correct property */}
//           <p>Email: {userInfo.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

