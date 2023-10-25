import React from "react";
import { useAuth } from "../../../Auth/context/AuthContext";
import styles from "./UserProfile.module.css";

function UserProfile() {
  const { user } = useAuth();

  return (
    <div className={styles.profile}>
      {user ? (
        <div className={styles.profileDetails}>
          <h2>Welcome {user.name}</h2>
          <p className={styles.profileItem}>Name: {user.name}</p>
          <p className={styles.profileItem}>Email: {user.email}</p>
          <p className={styles.profileItem}>
            Role: {user.venueManager ? "Venue Manager" : "Regular User"}
          </p>
          <img className={styles.avatar} src={user.avatar} alt="User Avatar" />
          {/* Add more user profile details here */}
        </div>
      ) : (
        <p className={styles.loading}>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;
