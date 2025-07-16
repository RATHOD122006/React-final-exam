import React, { useState, useEffect } from 'react';

import { searchMoviesByQuery } from '../../features/movies/moviesSlice';
import MovieCard from '../MovieCard/MovieCard';
import Loader from '../Loader/Loader';
import { CFormInput, CButton } from '@coreui/react';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (query.trim()) {
      const timer = setTimeout(() => {
        dispatch(searchMoviesByQuery(query));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [query, dispatch]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Search Movies</h2>
      <div className="mb-4">
        <CFormInput
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <Loader />}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-4">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;