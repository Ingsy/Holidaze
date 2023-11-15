import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Auth/context/AuthContext";
import Collapse from "../../../Components/Collapse";
import ProfileVenues from "../ProfileVenues";
import ProfileBookingsTest from "../ProfileBookings";
import UpdateAvatar from "../Avatar";
import { VenueCreate } from "../../../Components/Venue/VenueCreate";
import styles from "../../../Styles/Profile.module.scss";

function UserProfile(openCreateVenueForm) {
  const { user, token, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState(null);
  const [venuesCount, setVenuesCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Component rerendered");
      if (user && token) {
        console.log("Fetching user data...");
        try {
          const userData = await fetchUserData(token);
          console.log("User Data:", userData);

          setUser(userData);
          setVenuesCount(userData._count.venues);
          setBookingsCount(userData._count.bookings);

          console.log("Venues Count:", venuesCount);
          console.log("Bookings Count:", bookingsCount);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token, setUser, bookingsCount, venuesCount]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/profiles/?_bookings=true&_venues=true`,
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
      console.log("API Response:", userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  return (
    <div className="container text-center">
      {loading ? (
        <p className={styles.loading}>Loading user profile...</p>
      ) : user ? (
        <div className="row d-flex align-items-center justify-content-center">
          <div className={`${styles.ProfileContainer} col-12`}>
            <div className="col-12">
              <h2 className={`${styles.nameContainer} text-end`}>
                {user.name}
                <div className={styles.titleLine}></div>
              </h2>
            </div>
            <div className={`${styles.ProfileInfoContainer} text-center`}>
              <div className={`${styles.ButtonContainer} col-12 col-md-4 mb-4`}>
                <button
                  className={styles.Button}
                  onClick={() => setOpenSection("createVenue")}
                >
                  Create Venue
                </button>
                <button
                  className={styles.Button}
                  onClick={() => setOpenSection("yourVenues")}
                >
                  Venues ({venuesCount})
                </button>
                <button
                  className={styles.Button}
                  onClick={() => {
                    setOpenSection("yourBookings");
                  }}
                >
                  Bookings ({bookingsCount})
                </button>
              </div>
              <div className="col-12 col-md-4 mb-4 d-flex align-items-center justify-content-center">
                <div className={styles.AvatarImg}>
                  <img src={user.avatar} alt="User Avatar" />
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
                    setOpenSection("yourVenues");
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
                    setOpenSection("yourBookings");
                  }}
                >
                  <ProfileBookingsTest />
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
