import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieSearch from './components/MovieSearch';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/search" element={<MovieSearch />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
