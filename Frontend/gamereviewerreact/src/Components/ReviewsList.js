import ReviewCard from './ReviewCard'; // Import the ReviewCard component
import '../CSS/ReviewsList.css'; // Import the CSS file for flexbox layout
import React, { useEffect, useState } from 'react';
import { getAllReviews } from '../Services/Api';

export const ReviewsList = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReviews();
        const reviewsData = response.data.$values;
        const filteredReviews = reviewsData.filter(review => review.gameId === gameId);
        setReviews(filteredReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [gameId]);

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

