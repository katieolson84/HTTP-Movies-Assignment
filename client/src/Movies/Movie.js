import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

// Components
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, removeFromSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const unsaveMovie = () => {
    removeFromSavedList(movie);
  }

  const updateMovie = () => {
    push(`/update-movie/${params.id}`)
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        push('/')
      })
      .catch((err) => console.error(err.response))
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save button" onClick={saveMovie}>
        ❤️
      </div>
      <div className="remove button" onClick={unsaveMovie}>
        🤍
      </div>
      <div className="update button" onClick={updateMovie}>
        ✎
      </div>
      <div className="delete button" onClick={deleteMovie}>
       🆇 
      </div>
    </div>
  );
}

export default Movie;
