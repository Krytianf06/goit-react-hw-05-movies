import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

export default function MovieList({ moviesArray }) {
  const location = useLocation();

  return (
    <ul className={s.movieList}>
      {moviesArray?.map(movieItem => {
        return (
          <li key={movieItem.id} className={s.movieItem}>
            <Link to={`/movies/${movieItem.id}`} state={{ from: location }}>
              {movieItem.title || movieItem.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
