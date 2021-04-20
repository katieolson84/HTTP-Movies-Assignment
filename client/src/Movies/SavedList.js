import React from 'react';
import { NavLink } from 'react-router-dom';

function SavedList({ list }) {
  
  return (
    <div className="saved-container">
      <div className="saved-list">
        <h3>Favorites:</h3>
        {list.map(movie => {
          return (
            <NavLink
              to={`/movies/${movie.id}`}
              key={movie.id}
              activeClassName="saved-active"
            >
              <ul>
                <li className="saved-movie">{movie.title}</li>
              </ul>
            </NavLink>
          );
        })}
      
      </div>
    </div>
  );
}

export default SavedList;
