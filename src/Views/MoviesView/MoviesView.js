import { lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { fetchMoviesByKeyword } from 'service/service';
import Section from '../../components/Section';
import SearchForm from '../../components/SearchForm';
import s from './MoviesView.module.css';

const MovieList = lazy(() =>
  import('components/MovieList' /*"movie-list" */)
);

export default function MoviesView() {
  const [movielist, setMovielist] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  //

  useEffect(() => {
    const query = searchParams.get('query');

    if (!query) {
      return;
    }

    fetchMoviesByKeyword(query).then(res => setMovielist(res.results));
  }, [searchParams]);

  return (
    <Section>
      <SearchForm setSearchParams={setSearchParams} />
      <Suspense
        fallback={
          <div className={s.loader}>
            <MutatingDots />
          </div>
        }
      >
        <MovieList moviesArray={movielist} />
      </Suspense>
    </Section>
  );
}
