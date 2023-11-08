import React from "react";
import { removeToken } from "../utils/LocalStorage";
import styles from "./Logout.module.scss";

function LogoutButton() {
  const handleLogout = () => {
    console.log("Logout button clicked");
    removeToken();

    window.location.href = "/login";
  };

  return (
    <button className={styles.LogoutButton} onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
