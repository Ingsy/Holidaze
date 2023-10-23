import React from "react";
import styles from "./Alert.module.scss";

function Alert({ message, type }) {
  return (
    <div
      className={`${styles.alert} ${
        type === "success" ? styles.success : styles.error
      }`}
    >
      {message}
    </div>
  );
}

export default Alert;
