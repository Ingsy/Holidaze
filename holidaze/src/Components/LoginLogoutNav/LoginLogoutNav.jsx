import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LogoutButton from "../../Auth/components/Logout";
import { removeToken } from "../../Auth/utils/LocalStorage";
import ToggleVenueManager from "../../Pages/Profile/ToggleVenueManager/ToggleVenueManager";
import styles from "../../Styles/LoginLogoutNav.module.scss";

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
    <div className={`${styles.componentWrapper} text-center`}>
      <div className={styles.FontLog}>
        <FontAwesomeIcon icon={faUser} />
        {isLoggedIn ? (
          <LogoutButton onLogout={handleLogout} />
        ) : (
          <>
            <Link className={styles.LoginButton} to="/login">
              Login
            </Link>
            <Link className={styles.LoginButton} to="/register">
              Register
            </Link>
          </>
        )}
      </div>
      {isLoggedIn && <ToggleVenueManager />}
    </div>
  );
}

export default LoginLogoutVenueManager;
