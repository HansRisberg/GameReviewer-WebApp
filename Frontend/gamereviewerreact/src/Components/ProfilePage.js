import React, { useState, useEffect } from 'react';
import { getProfile, fetchUserReviews } from '../Services/Api'; 
import ReviewCard from './ReviewCard'; 
import '../CSS/ProfilePage.css';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Call getProfile() to fetch user profile data
    getProfile()
      .then(response => {
        console.log('Profile response:', response.data);
        setUserInfo(response.data);
        console.log('User Info:', response.data); // Log the user info
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFetchReviews = () => {
    fetchUserReviews()
      .then(response => {
        console.log('User reviews:', response.data);
        setReviews(response.data.$values);
      })
      .catch(error => {
        console.error('Error fetching user reviews:', error);
      });
  };

  return (
    <div className="profile-page-container">
      <div className="profile-container">
        <h1>Profile Page</h1>
        {userInfo && (
          <div className="profile-info">
            <div className="profile-image">
              {image ? (
                <img src={image} alt="Profile" />
              ) : (
                <p>No image uploaded</p>
              )}
              <input type="file" onChange={handleImageUpload} />
            </div>
            <p><strong>UserId:</strong> {userInfo.id}</p>
            <p><strong>UserName:</strong> {userInfo.userName}</p>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <button className="fetch-reviews-button" onClick={handleFetchReviews}>
              Fetch Reviews
            </button>
          </div>
        )}
      </div>

      <div className='reviews-container'>
        {reviews.length > 0 && (
          <div className="reviews">
            <h2>User Reviews</h2>
            <ul>
              {reviews.map((review) => (
                <li key={review.gameReviewId}>
                  <ReviewCard review={review} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;






