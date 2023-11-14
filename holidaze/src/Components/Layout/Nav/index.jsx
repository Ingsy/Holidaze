import React from "react";
import { Link, useLocation } from "react-router-dom";
import LoginLogoutVenueManager from "../../LoginLogoutNav";
import Search from "../../Search/Search";
import { useHolidaizApi } from "../../../Auth/constants";
import styles from "../../../Styles/Nav.modules.scss";

function Navbar({ onSearch }) {
  const { venues } = useHolidaizApi();

  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/">
          <img
            className={`${styles.Brand} width=200px d-inline-block align-top`}
            src="/Holidaze.png"
            alt="Logo"
            width="200px"
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
          <ul className="navbar-nav d-flex align-items-center justify-content-center justify-content-lg-start me-auto mb-2 mb-lg-0">
            <li className="nav-item  mx-3">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link to="/Profile" className="nav-link">
                Profile
              </Link>
            </li>

            <li className="nav-item mx-3">
              <Link to="/Register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link to="/Login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item mx-3">
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
