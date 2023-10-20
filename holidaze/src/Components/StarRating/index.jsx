import React from "react";
import styles from "./star.module.css";

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={i <= rating ? styles.starFilled : styles.starEmpty}
      >
        &#9733;
      </span>
    );
  }
  return <div className={styles.starRating}>{stars}</div>;
}

export default StarRating;