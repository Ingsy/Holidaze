import React, { useState } from "react";
import styles from "./Collapse.module.scss";
import CloseButton from "../Buttons/closeButton";

function Collapse({ title, isCollapsed, onToggle, children }) {
  return (
    <div
      className={`container ${
        isCollapsed ? styles.collapsed : styles.expanded
      }`}
    >
      <div className={`row ${styles.detailsContainer}`}>
        <div
          className={`col-12 d-flex justify-content-between align-items-center ${styles.header}`}
          onClick={() => onToggle(!isCollapsed)}
        >
          <h3 className={`mb-0 ${styles.venueName}`}>{title}</h3>
          <CloseButton onClick={() => onToggle(!isCollapsed)} />
        </div>
        <div className="col-12">
          <div className={`${styles.content}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Collapse;
