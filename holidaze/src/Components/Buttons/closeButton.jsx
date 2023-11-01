import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./";

const CloseButton = ({ onClick }) => {
  return (
    <button className={styles.closeButton} onClick={onClick}>
      <div className="d-flex flex-column align-items-center">
        <FontAwesomeIcon icon={faTimes} />
        <span className={styles.closeText}>Close</span>
      </div>
    </button>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;
