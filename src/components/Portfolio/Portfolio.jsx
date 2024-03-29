import arrow from "../../images/arrow.svg";

export default function Portfolio() {
  return (
    <>
      <section className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__lists">
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://github.com/MarinaGromova" target="blank"
            >
              Статичный сайт
              <img className="portfolio__img" src={arrow} alt="Стрелка" />
            </a>
          </li>
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://github.com/MarinaGromova" target="blank"
            >
              Адаптивный сайт
              <img className="portfolio__img" src={arrow} alt="Стрелка" />
            </a>
          </li>
          <li className="portfolio__list">
            <a
              className="portfolio__link"
              href="https://github.com/MarinaGromova" target="blank"
            >
              Одностраничное приложение
              <img className="portfolio__img" src={arrow} alt="Стрелка" />
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
