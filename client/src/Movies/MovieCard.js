import React from 'react';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <div className="movie-actor">
        <h3>Actors:</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            <ul className="star-list">
              <li>{star}</li>
            </ul>
          </div>
        ))}
        </div>
    </div>
  );
};

export default MovieCard;
