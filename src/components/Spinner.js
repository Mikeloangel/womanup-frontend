import React from "react";

import imgSpinner from '../images/spinner.png';

function Spinner() {
  return (
    <section className="section section-spinner">
      <h2 className="section__title">Загружаем...</h2>
      <img src={imgSpinner} alt="Загружаем!" className="section-spinner__image" />
    </section>
  )
}

export default Spinner;
