import { useEffect, useState } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import axios from 'axios';
import { getMovies } from './apis';
import { axiosConfig } from './axiosConfig';

function App() {
  const [movies, setMovies] = useState({}); // {2012: [], 2013: []}
  const [nextLoader, setNextLoader] = useState(false);
  const [prevLoader, setPrevLoader] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(-1);
  const [minYear, setMinYear] = useState(2012);
  const [maxYear, setMaxYear] = useState(2012);

  const onGenreChange = (e, { id, name }) => {
    console.log(id, name);
    setCurrentGenre(id);
    setMinYear(2012);
    setMaxYear(2012);
    setMovies({});
    init(undefined, id);
  };

  const fetchMovies = async (year = 2012, genre = -1) => {
    try {
      let url = `${getMovies.replace('{year}', year.toString())}${
        genre !== -1 ? `&with_genres=${genre}` : ''
      }`;
      url = genre !== -1 ? url + '&with_genres=' + genre : url;
      const res = await axios.get(url, axiosConfig);
      setMovies(prev => ({ ...prev, [year]: res.data.results }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNextMovies = () => {
    let curr = maxYear;
    setMaxYear(prev => prev + 1);
    fetchMovies();
  };

  const init = async (...restParams) => {
    setNextLoader(true);
    await fetchMovies(...restParams);
    setNextLoader(false);
  };
  console.log(nextLoader);
  useEffect(() => {
    init();
  }, []);

  return (
    <div className='root'>
      <Header onGenreChange={onGenreChange} currentGenre={currentGenre} />
      {prevLoader && <div className='loader'></div>}
      <MovieList movies={movies} />
      {nextLoader && <div className='loader'></div>}
    </div>
  );
}

export default App;
