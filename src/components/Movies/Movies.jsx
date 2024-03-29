import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from '../../utils/Movies';

export default function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  );
}
