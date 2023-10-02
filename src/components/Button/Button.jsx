import React from 'react';
import css from "../styles.module.css";

export const Button = ({ onClick }) => {
  return (
      <button type="button" className={css.button_load} onClick={onClick}>
      Load more
    </button>
  );
};