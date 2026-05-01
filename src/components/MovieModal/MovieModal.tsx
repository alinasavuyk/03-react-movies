import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css'
import { createPortal } from "react-dom";
import { useEffect } from 'react';

interface MovieModalProps {
  onClose: () => void;
  movie: Movie
}

const MovieModal=({movie, onClose}:MovieModalProps)=>{
    const defaultImg=`https://placehold.co/400x400?text=No+Image`;
   
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

useEffect(() => {
	const handleKeyDown = (e: KeyboardEvent) => {
	  if (e.key === "Escape") {
	    onClose();
	  }
	};
	
	document.addEventListener("keydown", handleKeyDown);
	document.body.style.overflow = "hidden";

	return () => {
	  document.removeEventListener("keydown", handleKeyDown);
	  document.body.style.overflow = "";
	};
}, [onClose]);

   
    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
  <div className={css.modal}>
    <button className={css.closeButton} aria-label="Close modal"  onClick={onClose}>
      &times;
    </button>
    <img
    src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`:defaultImg  }
          alt={movie.title}
          className={css.image}
    />
    <div className={css.content}>
      <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
       <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average.toFixed(2)}/10
          </p>
    </div>
  </div>
</div>,
 document.body
    )
}
export default MovieModal