import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="row">
      {movies.map(movie => (
        <div className="col-md-4 mb-4" key={movie.id}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">{movie.description}</p>
              <Link to={`/movies/${movie.id}`} className="btn btn-primary">Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;