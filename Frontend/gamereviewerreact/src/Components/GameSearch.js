import React, { useState } from 'react';
import { searchGames } from '../Services/Api'
import { Link } from 'react-router-dom';

const GameSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await searchGames(query);
           
            const sortedResults = response.sort((a, b) => a.name.localeCompare(b.name));
            setResults(sortedResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    style={{ width: '10%'}}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search the Internett Game Database(IGDB)"
                />
                <button type="submit">Search</button>
            </form>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {results.length > 0 && (
                    results.map((game, index) => (
                        <div key={index} style={{ width: '10%', margin: '10px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', borderRadius: '5px', padding: '10px' }}>
                            <Link to={`/gamedetailigdbview/${game.game}`}>
                                <h3>{game.name}</h3>
                            </Link>
                            {game.summary && <p>{game.summary}</p>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};



export default GameSearch;

