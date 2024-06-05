import React, { useState } from 'react';
import { searchGames } from '../Services/Api'

const GameSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await searchGames(query);
            setResults(response);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a game..."
                />
                <button type="submit">Search</button>
            </form>
            <div>
                {results.length > 0 && (
                    <ul>
                        {results.map((game, index) => (
                            <li key={index}>
                                <h3>{game.name}</h3>
                                {game.summary && <p>{game.summary}</p>}
                                {/* Add more fields as needed */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default GameSearch;
