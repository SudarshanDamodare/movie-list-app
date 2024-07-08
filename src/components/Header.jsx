import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getGenre } from '../apis';
import { axiosConfig } from '../axiosConfig';

const Header = ({ currentGenre, onGenreChange = () => {} }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenre = async () => {
      axios
        .get(getGenre, axiosConfig)
        .then(res => setGenres([{ id: -1, name: 'All' }, ...res.data.genres]))
        .catch(err => console.error(err));
    };
    fetchGenre();
  }, []);

  return (
    <div className='header'>
      <div className='heading'>MOVIEFLIX</div>
      <div className='genre-list'>
        {genres.map((genre, index) => (
          <div
            className={`genre ${currentGenre===genre.name ? 'active' : ''}`}
            key={`${genre.name}-${index}`}
            onClick={e => onGenreChange(e, genre)}
          >{genre.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Header