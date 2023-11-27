import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../../Styles/Modal.module.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.customModal}>
      <div className={styles.modalContent}>
        <div className={styles.closeButtonContainer} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} className={styles.closeButton} />
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
  children: PropTypes.node,
};

export default Modal;
