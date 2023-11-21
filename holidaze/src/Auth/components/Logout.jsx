import React from "react";
import { removeToken } from "../utils/LocalStorage";
import styles from "../../Styles/Logout.module.scss";

function LogoutButton() {
  const handleLogout = () => {
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
