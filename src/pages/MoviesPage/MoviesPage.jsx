import React from "react";
import { Link } from "react-router-dom";

const MoviesPage = ({ location }) => {
  const movie = location.state;
  return (
    <div className="MoviesPage">
      {movie ? (
        <div>
          <span>TITLE:</span>
          <span>{movie.name}</span>
          <span>LOCATIONS:</span>
          <span>{movie.name.locations[1]}</span>
          <Link to="/">RETURN</Link>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default MoviesPage;
