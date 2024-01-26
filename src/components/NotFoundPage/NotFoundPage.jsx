import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="error">
      <section className="error__container">
        <h2 className="error__title">404</h2>
        <p className="error__subtitle">Страница не найдена</p>
        <Link to="/signup" className="error__link">
          Назад
        </Link>
      </section>
    </main>
  );
}