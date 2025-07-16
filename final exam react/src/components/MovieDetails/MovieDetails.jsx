import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovieDetails } from '../../features/movies/moviesSlice';
import Loader from '../Loader/Loader';
import { 
  CBadge, 
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem
} from '@coreui/react';
import { addToFavorites, addToWatchlist } from '../../features/auth/authSlice';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, loading, error } = useSelector((state) => state.movies);
  const { isAuthenticated, favorites, watchlist } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [id, dispatch]);

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!movieDetails) return null;

  const isFavorite = favorites.some(movie => movie.id === movieDetails.id);
  const isInWatchlist = watchlist.some(movie => movie.id === movieDetails.id);

  return (
    <div className="container mt-4">
      <CRow>
        <CCol md={4}>
          <CCard>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Poster'
              }
              className="card-img-top"
              alt={movieDetails.title}
            />
            {isAuthenticated && (
              <CCardBody>
                <div className="d-grid gap-2">
                  <CButton 
                    color={isFavorite ? 'danger' : 'primary'}
                    onClick={() => dispatch(
                      isFavorite 
                        ? removeFromFavorites(movieDetails.id)
                        : addToFavorites(movieDetails)
                    )}
                  >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </CButton>
                  <CButton 
                    color={isInWatchlist ? 'warning' : 'secondary'}
                    onClick={() => dispatch(
                      isInWatchlist
                        ? removeFromWatchlist(movieDetails.id)
                        : addToWatchlist(movieDetails)
                    )}
                  >
                    {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  </CButton>
                </div>
              </CCardBody>
            )}
          </CCard>
        </CCol>
        <CCol md={8}>
          <CCard>
            <CCardHeader>
              <h1>{movieDetails.title}</h1>
              <p className="text-muted">{movieDetails.tagline}</p>
            </CCardHeader>
            <CCardBody>
              <p>{movieDetails.overview}</p>
              
              <CRow className="mb-3">
                <CCol>
                  <strong>Release Date:</strong> {movieDetails.release_date}
                </CCol>
                <CCol>
                  <strong>Runtime:</strong> {movieDetails.runtime} minutes
                </CCol>
                <CCol>
                  <strong>Rating:</strong> {movieDetails.vote_average}/10
                </CCol>
              </CRow>
              
              <div className="mb-3">
                <strong>Genres:</strong>{' '}
                {movieDetails.genres.map((genre) => (
                  <CBadge color="primary" className="me-2" key={genre.id}>
                    {genre.name}
                  </CBadge>
                ))}
              </div>
              
              {movieDetails.credits?.cast && (
                <div className="mb-3">
                  <h5>Cast</h5>
                  <CListGroup>
                    {movieDetails.credits.cast.slice(0, 10).map((person) => (
                      <CListGroupItem key={person.id}>
                        {person.name} as {person.character || 'Unknown'}
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                </div>
              )}
              
              {movieDetails.videos?.results && (
                <div className="mt-4">
                  <h5>Trailers</h5>
                  <CRow>
                    {movieDetails.videos.results
                      .filter(video => video.site === 'YouTube' && video.type === 'Trailer')
                      .slice(0, 2)
                      .map((video) => (
                        <CCol md={6} key={video.id}>
                          <div className="ratio ratio-16x9">
                            <iframe
                              src={`https://www.youtube.com/embed/${video.key}`}
                              title={video.name}
                              allowFullScreen
                            ></iframe>
                          </div>
                        </CCol>
                      ))}
                  </CRow>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default MovieDetails;