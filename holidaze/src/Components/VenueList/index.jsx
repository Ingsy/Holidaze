import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./VenueList.module.css";

function VenueList({}) {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.noroff.dev/api/v1/holidaze/venues")
      .then((response) => response.json())
      .then((data) => {
        setVenues(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching venue data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        venues.map((venue) => (
          <div key={venue.id} className={styles.venueCard}>
            <h2 className={`${styles.venueName} text-center`}>{venue.name}</h2>
            {venue.media.length > 0 && (
              <img
                src={venue.media[0]} // Display the first media URL
                alt={`Venue Media`}
                className={styles.media}
              />
            )}
            <p className={styles.venueDescription}>{venue.description}</p>
            <p className={styles.venuePrice}>Price: ${venue.price}</p>
            <p className={styles.venueMaxGuests}>
              Max Guests: {venue.maxGuests}
            </p>
            <p className={styles.venueRating}>Rating: {venue.rating}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default VenueList;
