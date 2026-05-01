import css from './MovieGrid.module.css'
import type { Movie } from "../../types/movie";
interface MovieGridProps{
	onSelect:(movie: Movie)=>void;
	movies: Movie[];
}
const MovieGrid =({onSelect, movies}:MovieGridProps)=>{
	const BASE_URL=`https://image.tmdb.org/t/p/w500/`;
	const defaultImg=`https://placehold.co/600x400?text=No+Image`;
    return (
        <ul className={css.grid}>
{movies.map((movie) => (
  <li key={movie.id}>
    <div className={css.card}>
      <img 
		    className={css.image} 
		    src={movie.backdrop_path ? `${BASE_URL}${movie.backdrop_path}`:defaultImg  }
		    alt={movie.title}
		    loading="lazy" 
		    onClick={()=>onSelect(movie)}
		  />
	    <h2 className={css.title}>{movie.title}</h2>
    </div>
  </li>))}
</ul>
    )
   

}
export default MovieGrid