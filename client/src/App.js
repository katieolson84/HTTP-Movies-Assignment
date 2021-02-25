import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from 'axios';

// Components
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
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
  useEffect((movieList) => {
    getMovieList();
  }, [movieList]);

  return (
    <>
    <div className="App">
        <div className="home-link">
          <Link className="title" exact to="/">
            My Movie Collection
          </Link>
          <Link className="home" exact to="/">
            Home
          </Link>
        </div>
        <div className="favorites">
          <SavedList list={savedList} />
        </div>
    </div>


      {/* Routes */}
      <Switch>
        <Route path="/update-movie/:id" render={(props) => {
          return (<UpdateForm {...props} setMovieList={setMovieList} movieList=
            {movieList} />);
        }} />
        <Route path="/movies/:id">
          <Movie 
          addToSavedList={addToSavedList} 
          removeFromSavedList={removeFromSavedList}
          updatedMovieList={getMovieList}
          />
        </Route>
  
        <Route exact path="/">
          <AddMovie />
          <MovieList movies={movieList} />
        </Route>
      </Switch>
    
    </>
  );
};

export default App;
