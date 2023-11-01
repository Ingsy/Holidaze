import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Auth/context/AuthContext";
import Collapse from "../../../Components/Collapse";
import ProfileVenues from "../ProfileVenues";
import CreateVenue from "../../../Components/CreateVenue";
import ProfileBookings from "../ProfileBookings";
import UpdateAvatar from "../Avatar";
import styles from "./Profile.module.scss";

function UserProfile() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    if (user && token) {
      // Fetch user data here
      fetchUserData(token)
        .then((userData) => {
          console.log("User Data:", userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, token]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/profiles`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `User data retrieval failed with status ${response.status}`
        );
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="container text-center">
      {loading ? (
        <p className={styles.loading}>Loading user profile...</p>
      ) : user ? (
        <div className="row">
          <div className={`${styles.ProfileContainer} col-12`}>
            <div className="col-12">
              <h2 className={`${styles.nameContainer} text-end`}>
                {user.name}
                <div className={styles.titleLine}></div>
              </h2>
            </div>
            <div className={`${styles.ProfileInfoContainer} text-center`}>
              <div className="col-12 col-md-4">
                <button onClick={() => setOpenSection("createVenue")}>
                  Create Venue
                </button>
                <button onClick={() => setOpenSection("yourVenues")}>
                  Your Venues
                </button>
                <button
                  onClick={() => {
                    setOpenSection("yourBookings");
                  }}
                >
                  Your Bookings
                </button>
              </div>
              <div className="col-12 col-md-4">
                <div className={styles.AvatarImg}>
                  <img src={user.avatar} alt="User Avatar" />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <ul className={styles.UserInfoContainer}>
                  <li>Email: {user.email}</li>
                  <li>
                    Role: {user.venueManager ? "Venue Manager" : "Regular User"}
                  </li>
                  <li>
                    <UpdateAvatar />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles.containerCollapse} text-center col`}>
            <div className="col-12">
              {openSection === "createVenue" && (
                <Collapse
                  title="Create Venue"
                  isCollapsed={openSection !== "createVenue"}
                  onToggle={() => {
                    console.log("Toggled 'Create Venue' section");
                    setOpenSection("createVenue");
                  }}
                >
                  <CreateVenue />
                </Collapse>
              )}
            </div>
            <div className="col-12">
              {openSection === "yourVenues" && (
                <Collapse
                  title="Your Venues"
                  isCollapsed={openSection !== "yourVenues"}
                  onToggle={() => {
                    console.log("Toggled 'Your Venues' section");
                    setOpenSection("yourVenues");
                  }}
                >
                  <ProfileVenues />
                </Collapse>
              )}
            </div>
            <div className="col-12"></div>
            <div className="col-12">
              {openSection === "yourBookings" && (
                <Collapse
                  title="Your Bookings"
                  isCollapsed={openSection !== "yourBookings"}
                  onToggle={() => {
                    console.log("Toggled 'Your Bookings' section");
                    setOpenSection("yourBookings");
                  }}
                >
                  <ProfileBookings />
                </Collapse>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.loading}>User not authenticated.</p>
      )}
    </div>
  );
}

export default UserProfile;
