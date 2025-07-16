import React from 'react';

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import MovieCard from '../components/MovieCard/MovieCard';

const Profile = () => {
  const { user, favorites, watchlist } = useSelector((state) => state.auth);

  return (
    <div className="container mt-4">
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h2>User Profile</h2>
            </CCardHeader>
            <CCardBody>
              <h4>{user.name}</h4>
              <p>Email: {user.email}</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mt-4">
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Favorite Movies ({favorites.length})</h3>
            </CCardHeader>
            <CCardBody>
              {favorites.length > 0 ? (
                <div className="row">
                  {favorites.map((movie) => (
                    <div key={movie.id} className="col-md-4 mb-4">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No favorite movies yet.</p>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mt-4">
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Watchlist ({watchlist.length})</h3>
            </CCardHeader>
            <CCardBody>
              {watchlist.length > 0 ? (
                <div className="row">
                  {watchlist.map((movie) => (
                    <div key={movie.id} className="col-md-4 mb-4">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              ) : (
                <p>Your watchlist is empty.</p>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Profile;