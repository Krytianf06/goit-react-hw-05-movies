import { Suspense } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { fetchMovieById } from 'service/service';
import { useNavigate } from 'react-router-dom';
import s from './MovieInfo.module.css';
import constants from 'constants';

export default function MovieInfo({
  locationObj = { pathname: '/', search: null },
}) {
  const [movie, setMovie] = useState(null);
  const { movieID } = useParams();
  const { search, pathname } = locationObj;

  const { casts, reviews, movies } = constants;
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/';
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(`${pathname}${search}`, { replace: false });
  }

  useEffect(() => {
    function getGenresNames(array) {
      return array
        .map(genre => {
          return genre.name;
        })
        .join(' ');
    }

    fetchMovieById(movieID).then(res => {
      if (res === null) {
        setMovie(null);
        return;
      }

      const genresTitles = getGenresNames(res.genres);
      setMovie({ ...res, genresTitles });
    });
  }, [movieID]);

  return (
    <>
      {movie ? (
        <>
          <button className={s.btnBack} type="button" onClick={handleGoBack}>
            &#129044; Go Back
          </button>

          <article className={s.movieInfo}>
            <div className={s.movieInfoBox}>
              {movie.poster_path ? (
                <div className={s.movieImgWrapper}>
                  <img
                    className={s.movieImg}
                    src={`${BASE_IMG_URL}w342/${movie?.poster_path}`}
                    alt={movie?.title || movie?.name}
                  />
                </div>
              ) : null}
              <div className={s.movieDesc}>
                <p className={s.movieTitle}>
                  {movie?.original_title} ({movie?.release_date.slice(0, 4)})
                </p>
                <p className={s.desc}>Rating: {movie?.vote_average}</p>
                <p className={s.descTitle}>Overview</p>
                <p className={s.desc}>{movie?.overview}</p>
                {movie?.genresTitles ? (
                  <>
                    <p className={s.descTitle}>Genres</p>
                    <p className={s.desc}>{movie?.genresTitles}</p>
                  </>
                ) : null}
              </div>
            </div>
            <div className={s.addInfoWrapper}>
              <p className={s.descTitle}>Additional Information</p>
              <ul className={s.addList}>
                <li className={s.addListItem}>
                  <Link to={`/${movies}/${movieID}/${casts}`}>Casts</Link>
                </li>
                <li className={s.addListItem}>
                  <Link to={`/${movies}/${movieID}/${reviews}`}>Reviews</Link>
                </li>
              </ul>
            </div>
          </article>
          <Suspense
            fallback={
              <div className={s.loader}>
                <MutatingDots />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </>
      ) : null}
    </>
  );
}
