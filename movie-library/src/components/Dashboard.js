import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', description: '' });

  const fetchMovies = () => {
    axios.get('http://localhost:3000/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAdd = () => {
    axios.post('http://localhost:3000/movies', newMovie)
      .then(() => {
        setNewMovie({ title: '', description: '' });
        fetchMovies();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/movies/${id}`)
      .then(() => fetchMovies())
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h3>Dashboard</h3>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={newMovie.title}
          onChange={e => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={newMovie.description}
          onChange={e => setNewMovie({ ...newMovie, description: e.target.value })}
        ></textarea>
        <button className="btn btn-success" onClick={handleAdd}>Add Movie</button>
      </div>

      <ul className="list-group">
        {movies.map(movie => (
          <li key={movie.id} className="list-group-item d-flex justify-content-between align-items-center">
            {movie.title}
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;