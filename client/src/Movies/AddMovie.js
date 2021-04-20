import React, { useState } from 'react';
import axios from 'axios';

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: ""
}

const AddMovie = () => {
    const [formValues, setFormValues] = useState(initialMovie);
    
    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newMovie = {
            ...formValues,
            stars: formValues.stars.split(","),
        };
        axios
        .post('http://localhost:5000/api/movies/', newMovie)
        .then((res) => 
            console.log(res))

        .catch(err =>
            console.log(err));
        setFormValues(initialMovie);
    };

    return (
        <div className="add-container">
            <div>
                <h2 className="add-movie">Add New Movie</h2>
           </div>
           <form onSubmit={handleSubmit}>
               <input 
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                value={formValues.title}
               />
               <input 
                type="text"
                name="director"
                onChange={handleChange}
                placeholder="Director"
                value={formValues.director}
               />
               <input 
                type="number"
                name="metascore"
                onChange={handleChange}
                placeholder="Metascore"
                value={formValues.metascore}
               />
               <input 
                type="text"
                name="stars"
                onChange={handleChange}
                placeholder="Stars"
                value={formValues.stars}
               />
               <button className="button">Add Movie</button>
           </form>
        </div>
    )
}

export default AddMovie;
