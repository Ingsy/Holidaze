import React from "react";
import RegisterForm from "../../Auth/components/RegisterForm";
import styles from "../../Styles/VenueDetails.module.scss";

function Register() {
  return (
    <div className={`${styles.detailsContainer} text-center`}>
      <div className={styles.header}>
        <h1 className={styles.venueName}>Register</h1>
      </div>
      <div className={styles.titleLine}></div>
      <RegisterForm />
    </div>
  );
}

export default Register;
