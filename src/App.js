import { useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [nextLoader, setNextLoader] = useState(false);
  const [prevLoader, setPrevLoader] = useState(false);
  const [currentGenre, setCurrentGenre] = useState('All');

  const onGenreChange = (e, {id, name}) => {
    console.log(id, name);
    setCurrentGenre(name);
  }

  return (
    <div className="root">
      <Header onGenreChange={onGenreChange} currentGenre={currentGenre} />
      <MovieList />
    </div>
  );
}

export default App;
