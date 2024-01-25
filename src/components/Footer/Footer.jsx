export default function Footer() {
  return (
    <>
      <footer className="footer">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__container">
          <p className="footer__data">&#169; {new Date().getFullYear()}</p>
          <nav className="footer__container-nav">
            <a className="footer__link" href="https://practicum.yandex.ru/" target="blank">
              Яндекс.Практикум
            </a>
            <a
              className="footer__link"
              href="https://github.com/MarinaGromova/" target="blank"
            >
              Github
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
