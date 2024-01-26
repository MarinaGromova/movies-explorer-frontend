// import knopka from '';

export default function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__container">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            required
          />
          <button type="submit" className="search-form__button">
            Поиск
          </button>
        </div>
        <div className="search-form__checkbox-container">
          <input
            type="checkbox"
            name="checkbox"
            className="search-form__checkbox-input"
            id="switch"
          />
          <label className="search-form__checkbox"  for="switch">
          </label>
          <p className="search-form__checkbox-text">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}
