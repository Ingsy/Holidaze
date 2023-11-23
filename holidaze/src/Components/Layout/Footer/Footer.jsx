import React from "react";
import styles from "../../../Styles/Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Holidaze. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
