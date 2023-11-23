import React, { useState } from "react";
import Modal from "../../../Components/Modal/Modal";
import styles from "../../../Styles/Avatar.module.scss";
import { useHolidaizApi } from "../../../Auth/constants/useHolidazeAPI.js";
import Alert from "../../../Components/Alert/Alert";

function UpdateAvatar() {
  const { profile } = useHolidaizApi();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAvatarUpdate = async () => {
    try {
      if (!avatarUrl) {
        setError("Avatar URL is required.");
        return;
      }

      const updatedData = {
        avatar: avatarUrl,
      };

      const response = await profile.update(updatedData);
      if (response.status === 200) {
        setSuccessMessage("Avatar updated successfully");
        setError("");
      } else {
        setError("Avatar update failed. Please try again.");
      }
    } catch (error) {
      console.error("Avatar update failed:", error);
      setError(`Avatar update failed: ${error.message}`);
    } finally {
      setAvatarUrl("");
      closeModal();
    }
  };

  return (
    <div className={`${styles.updateForm}`}>
      <button onClick={openModal} className={styles.updateButton}>
        Update Avatar
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className={styles.modalBody}>
          <h2>Update Avatar</h2>
          <input
            type="text"
            placeholder="Add URL eks: https://picsum.photos/200/300"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className={styles.inputField}
          />
          <button onClick={handleAvatarUpdate} className={styles.updateButton}>
            Update Avatar
          </button>
        </div>
        {error && <Alert message={error} type="error" />}
        {successMessage && <Alert message={successMessage} type="success" />}
      </Modal>
    </div>
  );
}

export default UpdateAvatar;
