/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Collapse from "../../../Components/Collapse/Collapse";
import ProfileVenues from "../ProfileVenues";
import ProfileBookings from "../ProfileBookings";
import UpdateAvatar from "../Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { VenueCreate } from "../../../Components/Venue/VenueCreate";
import { useHolidaizApi } from "../../../Auth/constants/useHolidazeAPI";
import styles from "../../../Styles/Profile.module.scss";

function UserProfile({ openCreateVenueForm }) {
  const { profile, user } = useHolidaizApi();
  const [isUserProfileLoading, setLoading] = useState(true);

  const [openSection, setOpenSection] = useState(null);
  const [venuesCount, setVenuesCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (user.name) {
        try {
          const userData = await profile.getProfile(user.name);
          setVenuesCount(userData._count.venues);
          setBookingsCount(userData._count.bookings);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [user.name]);

  return (
    <div className="container text-center">
      {isUserProfileLoading ? (
        <p className={styles.loading}>Loading user profile...</p>
      ) : user ? (
        <div
          className={`${styles.EntireProfileContainer} row d-flex align-items-center justify-content-center`}
        >
          <div className={`${styles.ProfileContainer} col-12`}>
            <div className="col-12">
              <div
                className={`${styles.nameContainer} d-flex justify-content-between`}
              >
                <div className="text-start">
                  {user.venueManager ? "Venue Manager" : "User"}
                </div>
                <div className="text-end">{user.name}</div>
              </div>
              <div className={styles.titleLine}></div>
            </div>
            <div className={`${styles.ProfileInfoContainer} text-center`}>
              <div className={`${styles.ButtonContainer} col-12 col-md-4 mb-4`}>
                {user.venueManager && (
                  <button
                    className={`${styles.Button} ${
                      openSection === "createVenue" ? styles.activeButton : ""
                    }`}
                    onClick={() => setOpenSection("createVenue")}
                  >
                    Create Venue
                  </button>
                )}
                {user.venueManager && (
                  <button
                    className={`${styles.Button} ${
                      openSection === "yourVenues" ? styles.activeButton : ""
                    }`}
                    onClick={() => setOpenSection("yourVenues")}
                  >
                    Your venues ({venuesCount})
                  </button>
                )}
                <button
                  className={`${styles.Button} ${
                    openSection === "yourBookings" ? styles.activeButton : ""
                  }`}
                  onClick={() => {
                    setOpenSection("yourBookings");
                  }}
                >
                  Your bookings ({bookingsCount})
                </button>
              </div>
              <div className="col-12 col-md-4 mb-4 d-flex align-items-center justify-content-center">
                <div className={styles.AvatarImg}>
                  {user.avatar ? (
                    <img src={user.avatar} alt="User Avatar" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className={styles.AvatarFont}
                    />
                  )}
                </div>
              </div>
              <div className={`${styles.ButtonContainer} col-12 col-md-4 mb-4`}>
                <div className="mb-3">{user.email}</div>
                <div className="mb-3">
                  Role: {user.venueManager ? "Venue Manager" : "User"}
                </div>
                <div>
                  <UpdateAvatar />
                </div>
              </div>
            </div>
            <div className={styles.titleLine}></div>
          </div>
          <div className={`${styles.containerCollapse} text-center col`}>
            <div className="col-12">
              {openSection === "createVenue" && (
                <Collapse
                  title="Create Venue"
                  isCollapsed={openSection !== "createVenue"}
                  onToggle={() => {
                    setOpenSection((sectionAlreadyOpen) =>
                      sectionAlreadyOpen === "createVenue"
                        ? null
                        : "createVenue"
                    );
                  }}
                >
                  <VenueCreate openCreateVenueForm={openCreateVenueForm} />
                </Collapse>
              )}
            </div>
            <div className="col">
              {openSection === "yourVenues" && (
                <Collapse
                  title="Your Venues"
                  isCollapsed={openSection !== "yourVenues"}
                  onToggle={() => {
                    setOpenSection((sectionAlreadyOpen) =>
                      sectionAlreadyOpen === "yourVenues" ? null : "yourVenues"
                    );
                  }}
                >
                  <ProfileVenues openCreateVenueForm={openCreateVenueForm} />
                </Collapse>
              )}
            </div>
            <div className="col-12">
              {openSection === "yourBookings" && (
                <Collapse
                  title="Your Bookings"
                  isCollapsed={openSection !== "yourBookings"}
                  onToggle={() => {
                    setOpenSection((sectionAlreadyOpen) =>
                      sectionAlreadyOpen === "yourBookings"
                        ? null
                        : "yourBookings"
                    );
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
