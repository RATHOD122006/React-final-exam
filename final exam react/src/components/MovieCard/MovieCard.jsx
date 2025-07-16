import React from 'react';
import { Link } from 'react-router-dom';
import { CButton } from '@coreui/react';

const MovieCard = ({ movie }) => {
  return (
    <div className="card movie-card h-100">
      <div className="position-relative">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Poster'
          }
          className="card-img-top movie-poster"
          alt={movie.title}
        />
        <div className="rating-badge">{movie.vote_average}</div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text text-muted">
          {new Date(movie.release_date).getFullYear()}
        </p>
        <Link to={`/movie/${movie.id}`}>
          <CButton color="primary">View Details</CButton>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;