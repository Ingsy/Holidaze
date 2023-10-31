import React, { useState } from "react";
import styles from "./Collapse.module.scss";

function Collapse({ title, children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`detailsContainer ${
        isCollapsed ? styles.collapsed : styles.expanded
      }`}
    >
      <button onClick={toggleCollapse}>
        {isCollapsed ? "Expand" : "Collapse"}
      </button>
      <div className={styles.header}>
        <h3 className={styles.venueName}>{title}</h3>
        <div className={styles.titleLine}></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default Collapse;
