import React from 'react';
import MovieCard from './MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './Loader';

const MovieList = ({ movies }) => {
  return (
    <div className='list-container'>
      {Object.keys(movies).map(year => (
        <React.Fragment key={year}>
          <div className='movie-year mb-2'>{year}</div>
          <div className='movie-list'>
            {movies[year].map(movie => (
              <MovieCard data={movie} key={JSON.stringify(movie)} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MovieList;
