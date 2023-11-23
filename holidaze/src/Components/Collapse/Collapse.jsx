import React from "react";
import CloseButton from "../Buttons/closeButton";
import styles from "../../Styles/Collapse.module.scss";

function Collapse({ title, isCollapsed, onToggle, children }) {
  const handleToggle = (event) => {
    event.stopPropagation();
    console.log("Toggle clicked");
    onToggle(!isCollapsed);
  };

  return (
    <div
      className={`container ${
        isCollapsed ? styles.collapsed : styles.expanded
      }`}
    >
      <div className={`row ${styles.detailsContainer}`}>
        <div
          className={`col-12 d-flex justify-content-between align-items-center ${styles.header}`}
          onClick={handleToggle}
        >
          <div className={styles.closeButtonContainer}>
            <CloseButton
              onClick={(event) => {
                console.log("Close button clicked");
                handleToggle(event);
              }}
            />
          </div>
          <h3 className={`mb-0 ${styles.venueName}`}>{title}</h3>
        </div>
        <div className="col-12">
          <div className={`${styles.content}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Collapse;
