import React, { useState } from "react";
import { headers } from "../../../Auth/utils/authFetch";
import { getUserName } from "../../../Auth/utils/LocalStorage";
import { useAuth } from "../../../Auth/context/AuthContext";
import styles from "../../../Styles/Toggle.module.scss";

function ToggleVenueManager({ isVenueManager }) {
  const [venueManager, setVenueManager] = useState(isVenueManager);
  const userName = getUserName();
  const { updateUserRole } = useAuth();

  const handleToggle = () => {
    const updatedValue = !venueManager;
    setVenueManager(updatedValue);
    updateUserRole(updatedValue);

    const managerUrl = `https://api.noroff.dev/api/v1/holidaze/profiles/${userName}`;
    const requestOptions = {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({
        venueManager: updatedValue,
      }),
    };

    fetch(managerUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.error("Toggle update failed");
          throw new Error("Toggle update failed");
        }
        console.log("Toggle successful");
        return updatedValue;
      })
      .catch((error) => {
        setVenueManager(!updatedValue);
        console.error("Error toggling Manager/normal-user:", error);
        throw error;
      });
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
