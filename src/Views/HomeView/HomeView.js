import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from 'service/service';
import Section from 'components/Section';
import MovieList from 'components/MovieList';

export default function HomeView() {
  const [trendingMovielist, setTrendingMovielist] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(res => setTrendingMovielist(res.results));
  }, []);

  return (
    <Section title="Trending today">
      <MovieList moviesArray={trendingMovielist} />
    </Section>
  );
}
