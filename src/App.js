import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import axios from 'axios';
import { getMovies } from './apis';
import { axiosConfig } from './axiosConfig';
import Loader from './components/Loader';

function App() {
  const [movies, setMovies] = useState({}); // {2012: [], 2013: []}
  const [initLoader, setInitLoader] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(-1);
  const [hasMore, setHasMore] = useState(false);
  const [maxYear, setMaxYear] = useState(2012);
  const nextLoaderRef = useRef();
  const [isLoaderRefVisible, setIsLoaderRefVisible] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const onGenreChange = (e, { id, name }) => {
    setCurrentGenre(id);
    setMaxYear(2012);
    setMovies({});
    init(undefined, id);
  };

  const fetchMovies = async (year = 2012, genre = currentGenre) => {
    let currentYear = new Date().getFullYear();
    try {
      const url = `${getMovies.replace('{year}', year.toString())}${
        genre !== -1 ? `&with_genres=${genre}` : ''
      }`;
      const res = await axios.get(url, axiosConfig);
      setHasMore(year < currentYear);
      setMovies(prev => ({ ...prev, [year]: res.data.results }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNextMovies = async () => {
    await fetchMovies(maxYear + 1);
    setMaxYear(prev => prev + 1);
  };

  const init = async (...restParams) => {
    setInitLoader(true);
    await fetchMovies(...restParams);
    setInitLoader(false);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const ref = nextLoaderRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => ref && observer.unobserve(ref);
  }, [isLoaderRefVisible]);

  useEffect(() => {
    if (isIntersecting && hasMore) fetchNextMovies();
  }, [isIntersecting]);

  return (
    <div className='root'>
      <Header onGenreChange={onGenreChange} currentGenre={currentGenre} />
      {initLoader ? <Loader /> : <MovieList movies={movies} />}
      {!initLoader && hasMore && (
        <div
          ref={el => {
            nextLoaderRef.current = el;
            setIsLoaderRefVisible(prev => !prev);
          }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
}

export default App;
