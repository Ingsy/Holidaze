import React, { useState } from "react";
import { UpdateVenueManager } from "./venueManagerToggle";
import styles from "./Toggle.module.scss";

function ToggleVenueManager({ userName, isVenueManager }) {
  const [venueManager, setVenueManager] = useState(isVenueManager);

  const handleToggle = () => {
    // Toggle the venueManager status
    setVenueManager(!venueManager);
    // Update the venueManager status in the database
    UpdateVenueManager(userName, !venueManager);
  };

  return (
    <div className={styles.toggleWrapper}>
      <div
        className={`${styles.toggleContainer} ${
          venueManager ? styles.active : ""
        }`}
      >
        <div className={styles.toggleSlider} onClick={handleToggle}></div>
      </div>
      <div className={styles.toggleText}>
        <label>{venueManager ? "Venue Manager" : "Regular User"}</label>
      </div>
    </div>
  );
}

export default ToggleVenueManager;
