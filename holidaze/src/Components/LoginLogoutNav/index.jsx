import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LogoutButton from "../../Auth/components/Logout";
import { removeToken } from "../../Auth/utils/LocalStorage";
import styles from "./LoginLogoutNav.module.css";
import ToggleVenueManager from "../../Pages/Profile/ToggleVenueManager/ToggleVenueManager";

function LoginLogoutVenueManager() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLogin = () => {
    // Check if a token is present in local storage
    const token = localStorage.getItem("token");

    // Set the user as logged in if a token exists
    setIsLoggedIn(!!token); // true if token exists, false if not
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
      {isLoggedIn ? (
        <div>
          <h2>
            <FontAwesomeIcon icon={faUser} />
          </h2>
          <LogoutButton onLogout={handleLogout} />
          <ToggleVenueManager />
        </div>
      ) : (
        <div>
          {/* Display a link to the login page */}
          <Link to="/login">
            <button className={styles.LoginButton}>Login</button>
          </Link>
          <button onClick={() => alert("Please log in or register")}>
            Toggle Venue Manager
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginLogoutVenueManager;
