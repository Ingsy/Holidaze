import React, { useState } from "react";
import { UpdateVenueManager } from "./venueManagerToggle";
import styles from "./Toggle.module.css";

function ToggleVenueManager({ userName, isVenueManager }) {
  const [venueManager, setVenueManager] = useState(isVenueManager);

  const handleToggle = () => {
    // Toggle the venueManager status
    setVenueManager(!venueManager);
    // Update the venueManager status in the database
    UpdateVenueManager(userName, !venueManager);
  };

  return (
    <div>
      <div
        className={`${styles.formCheck} ${styles.formSwitch} ${styles.formCheck}`}
      >
        <input
          type="checkbox"
          className={`${styles.formCheckInput} ${styles.formCheckInput}`}
          id="venueManagerSwitch"
          checked={venueManager}
          onChange={handleToggle}
        />
        <label
          className={`${styles.formCheckLabel} ${styles.formCheckLabel}`}
          htmlFor="venueManagerSwitch"
        >
          Venue Manager
        </label>
      </div>
    </div>
  );
}

export default ToggleVenueManager;
