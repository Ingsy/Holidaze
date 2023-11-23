import React from "react";
import styles from "../../Styles/ButtonsAndLinks.module.scss";

const BaseButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} tabIndex="0" className={styles.BaseButton}>
      {children}
    </button>
  );
};

export default BaseButton;
