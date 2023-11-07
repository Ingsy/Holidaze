import React from "react";
import LoginForm from "../../Auth/components/LoginForm";
import styles from "../../Styles/VenueDetails.module.css";

function Login() {
  return (
    <div className={`${styles.detailsContainer} text-center`}>
      <div className={styles.header}>
        <h1 className={styles.venueName}>Login</h1>
      </div>
      <div className={styles.titleLine}></div>
      <LoginForm />
    </div>
  );
}

export default Login;
