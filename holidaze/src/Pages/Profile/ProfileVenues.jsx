import React, { useEffect, useState } from "react";
import styles from "./ProfileVenues.module.css";

function ProfileVenues({ loggedInUserName }) {
  const [venuesData, setVenuesData] = useState([]);

  // Fetch and display venue-related data
  useEffect(() => {
    const baseUrl = "https://api.noroff.dev/api/v1/holidaze/profiles/";

    const apiUrl = `${baseUrl}${loggedInUserName}?_venues=true`;

    fetch(apiUrl)
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
