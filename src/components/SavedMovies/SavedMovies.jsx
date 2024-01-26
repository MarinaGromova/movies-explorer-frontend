import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesSaved from '../../utils/SavedMovies';

export default function SavedMovies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList  movies={moviesSaved}/>
    </main>
  );
}