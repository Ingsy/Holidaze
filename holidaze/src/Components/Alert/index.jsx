import React from "react";
import styles from "./Alert.module.scss";

function Alert({ message, type, children }) {
  return (
    <div
      className={`${styles.alert} ${
        type === "success" ? styles.success : styles.error
      }`}
    >
      {message}
      {children}
    </div>
  );
}

export default Alert;
