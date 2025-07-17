import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      axios.get(`http://localhost:3000/movies?q=${query}`)
        .then(res => setResults(res.data))
        .catch(err => console.error(err));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search movies..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {results.map(movie => (
        <div key={movie.id} className="card mb-2">
          <div className="card-body">
            <h5>{movie.title}</h5>
            <p>{movie.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieSearch;