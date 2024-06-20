import ReviewCard from './ReviewCard';
import '../CSS/ReviewsList.css';
import React, { useEffect, useState } from 'react';
import { getAllReviews, getAllReviewsFromGameId } from '../Services/Api'; 

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
      <h3>Latest reviews:</h3>
      <div className="reviews-container">
      {reviews.length > 0 ? (
          reviews.slice().reverse().map(review => (
            <ReviewCard key={review.gameReviewId} review={review} />
          ))
        ) : (
          <p>Loading...</p>
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
      <h3>Latest reviews:</h3>
      <div className="reviews-container">
        {reviews.length > 0 ? (
          reviews.slice().reverse().map(review => (
            <ReviewCard key={review.gameReviewId} review={review} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
