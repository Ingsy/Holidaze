import React from "react";
import styles from "./star.module.css";

function StarRating({ rating }) {
  return rating < 1 ? null : (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? styles.starFilled : styles.starEmpty}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default StarRating;
