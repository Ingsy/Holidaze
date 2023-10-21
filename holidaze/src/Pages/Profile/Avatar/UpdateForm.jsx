import { useState } from "react";
import { UpdateAvatar } from "./UpdateAvatar";
import styles from "./Avatar.module.css";

function UpdateForm({ username }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");

  const handleAvatarUpdate = async () => {
    try {
      if (!avatarUrl) {
        setError("Avatar URL is required.");
        return;
      }

      await UpdateAvatar(username, avatarUrl);
      setAvatarUrl("");
      setError("");
      alert("Avatar updated successfully!");
    } catch (error) {
      setError(`Avatar update failed: ${error.message}`);
    }
  };

  return (
    <div className={styles.updateForm}>
      <input
        type="text"
        placeholder="eks: https://picsum.photos/200/300"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        className={styles.inputField}
      />
      <button onClick={handleAvatarUpdate} className={styles.updateButton}>
        Update Avatar
      </button>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}

export default UpdateForm;
