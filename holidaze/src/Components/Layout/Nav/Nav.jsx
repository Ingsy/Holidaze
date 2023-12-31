import React from "react";
import { Link, useLocation } from "react-router-dom";
import LoginLogoutVenueManager from "../../LoginLogoutNav/LoginLogoutNav";
import Search from "../../Search/Search";
import { useHolidaizApi } from "../../../Auth/constants";
import { useAuth } from "../../../Auth/context/AuthContext";
import styles from "../../../Styles/Nav.module.scss";

function Navbar({ onSearch }) {
  const { venues } = useHolidaizApi();
  const { user } = useAuth();
  const location = useLocation();
  const isLoggedIn = !!user.token;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/">
          <img
            className={`${styles.Brand} width=200px d-inline-block align-top`}
            src="/Holidaze.png"
            alt="Logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex align-items-lg-center justify-content-lg-center me-auto mb-2 mb-lg-0 mx-auto">
            {isLoggedIn && (
              <>
                <li className="nav-item m-2">
                  <Link
                    to="/"
                    className={`${styles.navLink} ${
                      location.pathname === "/" ? styles.active : ""
                    }`}
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item m-2 me-5">
                  <Link
                    to="/Profile"
                    className={`${styles.navLink} ${
                      location.pathname === "/Profile" ? styles.active : ""
                    }`}
                    aria-current="page"
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item m-2">
              <LoginLogoutVenueManager />
            </li>
          </ul>
          {location.pathname === "/" && (
            <>
              <div className={`d-lg-none`}>
                <Search venues={venues} onSearch={onSearch} />
              </div>
              <div className={`ml-auto d-none d-lg-flex`}>
                <Search venues={venues} onSearch={onSearch} />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
