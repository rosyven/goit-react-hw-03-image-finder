import React from "react";
import css from "../styles.module.css";

export const ImageGallery = ({ children }) => {
  return <ul className={css.gallery}>{children}</ul>;
};
