// import React, { useEffect, useState } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import axios from 'axios';

// // const initialMovie = {
// //     title: "",
// //     director: "",
// //     metascore: "",
// //     stars: []
// // }

// const UpdateMovie = ({movieList, setMovieList }) => {
//     const [updateMovie, setUpdateMovie] = useState(initialMovie);
//     const {id} = useParams();
//     const { push } = useHistory();

//     useEffect(() => {
//         axios.get(`http://localhost:5000/api/movies/${id}`)
//         .then((res) => {
//             setUpdateMovie(res.data)
//             console.log(res.data)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     }, [id])
    
//     const handleChange = e => {
//         e.persist();
//         const {name, value} = e.target
//         setUpdateMovie({
//             ...updateMovie,
//             [name]: value
//         });
//     }

//     const handleSubmit = e => {
//         e.preventDefault();
//         axios
//         .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
//         .then(() => {
//             getMovieList()
//             push(`/`);
//         })
//         .catch(err => {
//             console.log("update failed", err);
//         });
//     };

//     return (
//         <div>
//            <h2>Update Movie</h2>
//            <form onSubmit={handleSubmit}>
//                <input 
//                 type="text"
//                 name="title"
//                 onChnage={handleChange}
//                 placeholder="Title"
//                 value={updateMovie.title}
//                />
//                <input 
//                 type="text"
//                 name="director"
//                 onChnage={handleChange}
//                 placeholder="Director"
//                 value={updateMovie.director}
//                />
//                <input 
//                 type="number"
//                 name="metascore"
//                 onChnage={handleChange}
//                 placeholder="Metascore"
//                 value={updateMovie.metascore}
//                />
//                <input 
//                 type="array"
//                 name="stars"
//                 onChnage={handleChange}
//                 placeholder="Stars"
//                 value={updateMovie.stars}
//                />
//                <button className="button">Update</button>
//            </form>
//         </div>
//     )
// }

// export default UpdateMovie

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const UpdateForm = ({ movieList, setMovieList }) => {
  const [formValues, setFormValues] = useState();
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then((res) => {
        setMovieList([...movieList, res.data]);
        push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {!formValues ? (
        "Loading..."
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="director"
            value={formValues.director}
            onChange={handleChange}
          />
          <input
            type="number"
            name="metascore"
            value={formValues.metascore}
            onChange={handleChange}
          />
          <button>Update Movie</button>
        </form>
      )}
    </div>
  );
};

export default UpdateForm; 