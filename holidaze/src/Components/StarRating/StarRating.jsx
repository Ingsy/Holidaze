import React from "react";
import styles from "../../Styles/star.module.css";

function StarRating({ rating }) {
  const ratingText = rating !== null ? `${rating}/5` : "0/5";

  return (
    <div className={styles.starRating}>
      <span className={styles.starFilled}>&#9733;</span>
      <span className={styles.ratingText}>{ratingText}</span>
    </div>
  );
}

export default StarRating;
