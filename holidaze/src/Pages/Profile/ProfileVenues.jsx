import React, { useEffect, useState } from "react";
import styles from "./ProfileVenues.module.css";
import { ProfileBaseUrl } from "../../Auth/constants";

function ProfileVenues({ loggedInUserName }) {
  const [venuesData, setVenuesData] = useState([]);

  // Fetch and display venue-related data
  useEffect(() => {
    const userVenuesUrl = `${ProfileBaseUrl}${loggedInUserName}?_venues=true`;

    fetch(userVenuesUrl)
      .then((response) => response.json())
      .then((data) => {
        setVenuesData(data);
      })
      .catch((error) => {
        console.error("Error fetching venue data:", error);
      });
  }, [loggedInUserName]);

  return (
    <div className={styles.venuesContainer}>
      <h3>Venues for {loggedInUserName}</h3>
      <ul>
        {venuesData.map((venue) => (
          <li key={venue.id}>
            <strong>{venue.name}</strong>
            <p>{venue.description}</p>
            {/* Display other venue-related data */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileVenues;
