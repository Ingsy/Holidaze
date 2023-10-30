import React, { useState } from "react";
import { headers } from "../../../Auth/utils/authFetch";
import styles from "./Avatar.module.css";
import Modal from "../../../Components/Modal";
import { getUserName } from "../../../Auth/utils/LocalStorage";

function UpdateAvatar() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userName = getUserName();

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

      const AvatarUrl = `https://api.noroff.dev/api/v1/holidaze/profiles/${userName}/media`;
      const requestOptions = {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({
          avatar: avatarUrl,
        }),
      };

      const response = await fetch(AvatarUrl, requestOptions);

      if (!response.ok) {
        throw new Error(" Plese try again");
      }

      setAvatarUrl("");
      setError("");
      closeModal();
      alert("Avatar updated successfully!");
    } catch (error) {
      setError(`Avatar update failed: ${error.message}`);
    }
  };

  return (
    <div className={`${styles.updateForm} text-center`}>
      <button onClick={openModal} className={styles.updateButton}>
        Update Avatar
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className={styles.modalBody}>
          <h2>Update Avatar</h2>
          <input
            type="text"
            placeholder="e.g., https://picsum.photos/200/300"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className={styles.inputField}
          />
          <button onClick={handleAvatarUpdate} className={styles.updateButton}>
            Update Avatar
          </button>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
      </Modal>
    </div>
  );
}

export default UpdateAvatar;
