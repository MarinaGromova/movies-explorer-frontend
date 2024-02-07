import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const pagePrevious = () => {
    navigate(-1);
  };

  return (
    <main className="error">
      <section className="error__container">
        <h2 className="error__title">404</h2>
        <p className="error__subtitle">Страница не найдена</p>
        <button type="button" className="error__link" onClick={pagePrevious}>
          Назад
        </button>
      </section>
    </main>
  );
}
