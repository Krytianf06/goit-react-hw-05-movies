import { lazy, Suspense } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { Routes, Route } from 'react-router-dom';
import constants from 'constants';
import s from './App.module.css';

const Header = lazy(() => import('../Header' /* "header" */));
const HomeView = lazy(() =>
  import('Views/HomeView' /* "home-view" */)
);
const MoviesView = lazy(() =>
  import('Views/MoviesView' /* "movie-view" */)
);
const NotFoundView = lazy(() =>
  import('Views/NotFoundView' /* "not-found" */)
);
const Navigation = lazy(() =>
  import('components/Navigation' /* "nav" */)
);
const MovieInfoView = lazy(() =>
  import('Views/MovieInfoView' /* "movie-info-view" */)
);
const Casts = lazy(() =>
  import('components/Casts/Casts' /* "casts" */)
);
const Reviews = lazy(() =>
  import('components/Reviews' /* "reviews" */)
);

export default function App() {
  const { home, movies, notFound, id, casts, reviews } = constants;

  return (
    <>
      <Header>
        <Navigation />
      </Header>

      <main>
        <Suspense
          fallback={
            <div className={s.loader}>
              <MutatingDots />
            </div>
          }
        >
          <Routes>
            <Route exact path={home} element={<HomeView />} />

            <Route path={movies} element={<MoviesView />} />

            <Route path={`movies/${id}`} element={<MovieInfoView />}>
              <Route path={casts} element={<Casts />} />
              <Route path={reviews} element={<Reviews />} />
            </Route>

            <Route path={notFound} element={<NotFoundView />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
