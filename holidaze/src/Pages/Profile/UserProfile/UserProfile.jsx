import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Auth/context/AuthContext";
import styles from "./UserProfile.module.scss";
import Collapse from "../../../Components/Collapse";

function UserProfile() {
  const { user, token } = useAuth();
  console.log("User in UserProfile:", user);
  console.log("Token in UserProfile:", token);
  const [loading, setLoading] = useState(true);

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
    <div className={`container ${styles.profile}`}>
      {loading ? (
        <p className={styles.loading}>Loading user profile...</p>
      ) : user ? (
        <div className="row">
          <div className="col">
            <h2 className={styles.profileName}>Welcome {user.name}</h2>
            <div className={styles.titleLine}></div>
          </div>
          <div className="col">
            <div className={`${styles.containerLeft} row`}>
              <div className="col-md-4">
                <Collapse title="Create Venue">
                  <ul>
                    <li>Create Venue content goes here</li>
                  </ul>
                </Collapse>
                <Collapse title="Your Venues">
                  <ul>
                    <li>Your Venues content goes here</li>
                  </ul>
                </Collapse>
                <Collapse title="Your Bookings">
                  <ul>
                    <li>Your Bookings content goes here</li>
                  </ul>
                </Collapse>
              </div>
              <div className="col-md-4">
                <img
                  className={styles.avatar}
                  src={user.avatar}
                  alt="User Avatar"
                />
              </div>
              <div className="col-md-4">
                <ul>
                  <li>Email: {user.email}</li>
                  <li>
                    Role: {user.venueManager ? "Venue Manager" : "Regular User"}
                  </li>
                  <li>Edit Avatar</li>
                </ul>
              </div>
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
