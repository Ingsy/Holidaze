import React, { useState } from "react";
import { useAuth } from "../../../Auth/context/AuthContext";
import { useHolidaizApi } from "../../../Auth/constants/useHolidazeAPI";
import styles from "../../../Styles/Toggle.module.scss";

function ToggleVenueManager({ isVenueManager }) {
  const [venueManager, setVenueManager] = useState(isVenueManager);
  const [previousValue, setPreviousValue] = useState(isVenueManager);
  const { updateUserRole } = useAuth();
  const { profile } = useHolidaizApi();

  const handleToggle = async () => {
    const updatedValue = !venueManager;

    try {
      setPreviousValue(venueManager);
      await profile.updateRole({ venueManager: updatedValue });
      await updateUserRole(updatedValue);
      setVenueManager(updatedValue);
    } catch (error) {
      console.error("Error toggling Manager/normal-user:", error);
      setVenueManager(previousValue);
    }
  };

  return (
    <div className={styles.toggleWrapper}>
      <div className={styles.toggleContainer}>
        <div
          className={`${styles.toggleSlider} ${
            venueManager ? styles.active : ""
          }`}
          onClick={handleToggle}
        ></div>
      </div>
      <div>
        <label> {venueManager ? "Venue Manager" : "User"}</label>
      </div>
    </div>
  );
}

export default ToggleVenueManager;
