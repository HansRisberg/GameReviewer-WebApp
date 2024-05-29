import React from 'react';
import GameForm from '../Components/GameForm';
import '../CSS/AddGameView.css';

const AddGameView = () => {
    return (
        <div className="add-game-view-container">
            <h2>Welcome to the Add Game Section!</h2>
            <p>This is where you can add a game.</p>
            <GameForm />
        </div>
    );
};

export default AddGameView;
