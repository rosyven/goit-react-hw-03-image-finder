import React from "react";
import css from "../styles.module.css";

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick, alt }) => {
  return (
    <li className={css.gallery_item}>
      <img
        className={css.item_image}
        src={webformatURL}
        alt="alt"
        onClick={onClick}
      />
    </li>
  );
};