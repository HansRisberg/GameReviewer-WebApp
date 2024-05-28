// ReviewsView.js
import React from 'react';
import {ReviewsList} from '../Components/ReviewsList';

const ReviewsView = () => {
  return (
    <div>
      <h2>Welcome to the Reviews View!</h2>
      <p>This is where you can view game reviews.</p>
      <ReviewsList/>
    </div>
  );
};

export default ReviewsView;