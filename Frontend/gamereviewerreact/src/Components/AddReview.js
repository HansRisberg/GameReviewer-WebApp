import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addReview } from '../Services/Api'; // Import the API function to add a review

const AddReview = ({ gameId }) => {
  const [showInputField, setShowInputField] = useState(false); // Toggle input field visibility
  const [reviewContent, setReviewContent] = useState('');
  const navigate = useNavigate();

  const handleReviewChange = (e) => {
    setReviewContent(e.target.value);
  };

  const handleShowInputField = () => {
    const token = localStorage.getItem('token'); // Consistent token retrieval

    if (!token) {
      navigate('/login'); // Redirect to login if user isn't authenticated
    } else {
      setShowInputField(true); // Show input field if user is authenticated
    }
  };

  const handleSubmitReview = async () => {
    if (reviewContent.trim() !== '') { // Check if review content is not empty
      try {
        // Use the imported function from Api.js
        const response = await addReview(gameId, reviewContent);

        console.log('Review submitted:', response.data);
        setReviewContent(''); // Reset the input field
        setShowInputField(false); // Hide the input field after submission
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  return (
    <div style={{paddingBottom: 10}}>
      {!showInputField ? (
        <button  onClick={handleShowInputField}>Write Review</button>
      ) : (
        <div>
          <textarea
            value={reviewContent}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
            style={{ width: '15%', height: '200px', padding: '10px', fontSize: '16px' }}
          />
          <button onClick={handleSubmitReview}>Submit Review</button>
          <button onClick={() => setShowInputField(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AddReview;
