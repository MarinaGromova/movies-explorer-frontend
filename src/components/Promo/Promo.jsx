import logo from '../../images/web.svg';
import React from 'react';

export default function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <h2 className='promo__subtitle'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </h2>
      </div>
      <img className='promo__img' src={logo} alt='Рисунок глобуса'/>
    </section>
  );
}