// import ReviewCard from './ReviewCard'; // Import the ReviewCard component
// import '../CSS/ReviewsList.css'; // Import the CSS file for flexbox layout
// import React, { useEffect, useState } from 'react';
// import { getAllReviewsFromGameId } from '../Services/Api';

// export const ReviewsList = ({ gameId }) => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await getAllReviewsFromGameId(gameId);
//         const reviewsData = response.data.$values;
//         const filteredReviews = reviewsData.filter(review => review.gameId === gameId);
//         setReviews(filteredReviews);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       }
//     };

//     fetchReviews();
//   }, [gameId]);

//   return (
//     <div>
//       <h3>All Reviews:</h3>
//       <div className="reviews-container">
//         {reviews.length > 0 ? (
//           reviews.map(review => (
//             <ReviewCard key={review.gameReviewId} review={review} />
//           ))
//         ) : (
//           <p>No reviews available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

import ReviewCard from './ReviewCard';
import '../CSS/ReviewsList.css';
import React, { useEffect, useState } from 'react';
import { getAllReviews, getAllReviewsFromGameId } from '../Services/Api'; // Import the API function for fetching all reviews

export const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReviews();
        const reviewsData = response.data.$values;
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h3>All Reviews:</h3>
      <div className="reviews-container">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <ReviewCard key={review.gameReviewId} review={review} />
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export const ReviewsListByGameId = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReviewsFromGameId(gameId);
        const reviewsData = response.data.$values;
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [gameId]);

  return (
    <div>
      <h3>Reviews for Game ID: {gameId}</h3>
      <div className="reviews-container">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <ReviewCard key={review.gameReviewId} review={review} />
          ))
        ) : (
          <p>No reviews available for this game.</p>
        )}
      </div>
    </div>
  );
};
