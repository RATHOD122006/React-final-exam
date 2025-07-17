import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{movie.title}</h3>
        <p className="card-text">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieDetails;