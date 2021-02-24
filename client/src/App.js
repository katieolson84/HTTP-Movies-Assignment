import React, { useState, useEffect } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import axios from 'axios';

// Components
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

// pull Movie List from api on server
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

// Add movie to the Saved List
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

// Remove a movie from the SavedList
  const removeFromSavedList = movie => {
    setSavedList([...savedList].filter(item => item.id !==movie.id))
  }

// Show the movie list on the screen
  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <nav>
        <h1 className="title">Movie List</h1>
        <div className="nav-links">
          <NavLink exact to="/">
            Home
          </NavLink>
        </div>
      </nav>
      <SavedList list={savedList} />

      {/* Routes */}
      <Switch>
        <Route path="/update-movie/:id" render={(props) => {
          return (<UpdateMovie {...props} setMovie={setMovieList} />);
        }} />
        <Route path="/movies/:id">
          <Movie 
          addToSavedList={addToSavedList} 
          removeFromSavedList={removeFromSavedList}
          updatedMovieList={getMovieList}
          />
        </Route>
        {/* <Route path= "/add-movie">
          <AddMovie />
        </Route> */}
        <Route exact path="/">
          <AddMovie />
          <MovieList movies={movieList} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
