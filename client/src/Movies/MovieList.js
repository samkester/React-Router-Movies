import React from 'react';
import {Link} from "react-router-dom";
import MovieCard from './MovieCard';

const MovieList = props => {
  return (
    <div className="movie-list">
      {props.movies.map(movie => (
        <Link key={movie.id} to={`movies/${movie.id}`}>
          <MovieCard key={movie.id} movie={movie} />
        </Link>
      ))}
    </div>
  );
}

/*function MovieDetails({ movie }) {
  return (
  );
}*/

export default MovieList;
