export default function AboutProject() {
  return (
    <>
      <section className="about-project" id="about-project">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__container">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
          <p className="about-project__text about-project__text-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className="about-project__time">
          <p className="about-project__term about-project__term-one">
            1 неделя
          </p>
          <p className="about-project__term about-project__term-four">
            4 неделя
          </p>
          <p className="about-project__term about-project__term-end">
            Back-end
          </p>
          <p className="about-project__term about-project__term-end">
            Front-end
          </p>
        </div>
      </section>
    </>
  );
}
