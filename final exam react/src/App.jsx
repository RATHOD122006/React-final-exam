import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import AppNavbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import MovieSearch from './components/MovieSearch/MovieSearch';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Profile from './pages/Profile';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar />
          <div className="container mt-4">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/search" component={MovieSearch} />
              <Route path="/movie/:id" component={MovieDetails} />
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;