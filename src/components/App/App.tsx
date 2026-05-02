import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar"
import fetchMovies from '../../services/movieService'
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState } from 'react';
import css from './App.module.css'
import type { Movie } from "../../types/movie";
import toast, { Toaster } from 'react-hot-toast';


 function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie]=useState<Movie|null>(null)

  const openModal = (movie:Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const handleSearch=async(query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);
      const data=(await fetchMovies(query)).results;
      if (data.length === 0) {
        toast.error("No movies found for your request.", {
        });
        return; 
      }
      setMovies(data)
    } catch {
       setIsError(true);
    } finally {
      setIsLoading(false);
    } 
  }

  
  return (
    <div className={css.app}>
       {isLoading && <Loader/>}
      {isError && <ErrorMessage/>}
    <Toaster position="top-right" reverseOrder={false} />
   <SearchBar onSubmit={handleSearch} />
    {movies.length > 0 && <MovieGrid  movies={movies} onSelect={openModal}/>}
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal}/>} 
    </div>
  )
}

export default App
