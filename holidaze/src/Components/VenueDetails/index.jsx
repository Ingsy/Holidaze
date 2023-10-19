import React, { useState, useEffect } from "react";
import styles from "./VenueDetails.module.css";
import { useParams } from "react-router-dom";

function VenueDetails() {
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const VenueDetailUrl = `https://api.noroff.dev/api/v1/holidaze/venues/${id}`;

    fetch(VenueDetailUrl)
      .then((response) => response.json())
      .then((data) => {
        setVenue(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching venue details:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className={styles.detailsContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className={styles.venueName}>{venue.name}</h2>
          <div className={styles.photosContainer}>
            {venue.media.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Venue ${index + 1}`}
                className={index === 0 ? styles.firstPhoto : styles.photo}
              />
            ))}
          </div>
          <p className={styles.venueDescription}>{venue.description}</p>
          <p className={styles.venuePrice}>Price: ${venue.price}</p>
          <p className={styles.venueMaxGuests}>Max Guests: {venue.maxGuests}</p>
          <p className={styles.rating}>rating: {venue.rating}</p>
          <div className={styles.locationContainer}>
            <p className={styles.locationTitle}>Location:</p>
            <p className={styles.locationInfo}>
              Address: {venue.location.address}
            </p>
            <p className={styles.locationInfo}>City: {venue.location.city}</p>
            <p className={styles.locationInfo}>Zip: {venue.location.zip}</p>
            <p className={styles.locationInfo}>
              Country: {venue.location.country}
            </p>
            <p className={styles.locationInfo}>
              Continent: {venue.location.continent}
            </p>
            <p className={styles.locationInfo}>
              Latitude: {venue.location.lat}, Longitude: {venue.location.lng}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default VenueDetails;
