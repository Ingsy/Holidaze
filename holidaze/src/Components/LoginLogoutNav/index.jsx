import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LogoutButton from "../../Auth/components/Logout";
import { removeToken } from "../../Auth/utils/LocalStorage";
import styles from "./LoginLogoutNav.module.scss";
import ToggleVenueManager from "../../Pages/Profile/ToggleVenueManager/ToggleVenueManager";

function LoginLogoutVenueManager() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLogin = () => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div className={styles.componentWrapper}>
          <div className={styles.FontLog}>
            <FontAwesomeIcon icon={faUser} />

            <LogoutButton onLogout={handleLogout} />
          </div>
          <ToggleVenueManager />
        </div>
      ) : (
        <div>
          <Link className={styles.LoginButton} to="/login">
            Login
          </Link>
          <button onClick={() => alert("Please login or register")}>
            Toggle Venue Manager
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginLogoutVenueManager;
