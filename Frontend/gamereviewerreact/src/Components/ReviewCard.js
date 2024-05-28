// ReviewCard.js
import React from 'react';
import '../CSS/ReviewCard.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <h3>{review.gameTitle}</h3>
      <p><strong>Reviewer:</strong> {review.reviewerName}</p>
      <p><strong>Email:</strong> {review.reviewerEmail}</p>
      <p><strong>Comment:</strong> {review.reviewContent}</p>
      <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ReviewCard;
