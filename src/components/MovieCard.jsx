import React from 'react'
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MovieCard = ({data}) => {
  return (
    <LazyLoadComponent>
      <div className='movie-card'>
        <LazyLoadImage
          alt={`${data.title}`}
          src={`https://image.tmdb.org/t/p/w300/${data.backdrop_path}`}
        />
        <div className='movie-info'>
          <div className='title'>{data.title}</div>
          <div className='ratings'>{data.vote_average}</div>
        </div>
      </div>
    </LazyLoadComponent>
  );
}

export default MovieCard