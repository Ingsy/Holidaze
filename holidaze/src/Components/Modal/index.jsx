import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.customModal}>
      <div className={styles.modalContent}>
        <div className={styles.closeButtonContainer}>
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.closeButton}
            onClick={onClose}
          />

          <p className={styles.closeText}>Close</p>
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
