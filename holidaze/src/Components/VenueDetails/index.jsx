import React, { useState, useEffect } from "react";
import styles from "./VenueDetails.module.css";
import StarRating from "../StarRating";

function VenueDetails({ match }) {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const venueId = match.params.id; // Extract venue ID from the URL parameter
    const apiUrl = `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setVenue(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching venue details:", error);
        setLoading(false);
      });
  }, [match.params.id]);

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
          <span className={styles.rating}>
            <StarRating rating={parseFloat(venue.rating)} />
          </span>
          <div className={styles.locationContainer}>
            <p className={styles.locationTitle}>Location:</p>
            <p className={styles.locationInfo}>
              {venue.location.address}, {venue.location.city},{" "}
              {venue.location.zip}
            </p>
            <p className={styles.locationInfo}>
              {venue.location.country}, {venue.location.continent}
            </p>
            <p className={styles.locationInfo}>
              Latitude: {venue.location.lat}, Longitude: {venue.location.lng}
            </p>
          </div>
          <div className={styles.ownerContainer}>
            <p className={styles.ownerTitle}>Owner:</p>
            <p className={styles.ownerInfo}>{venue.owner.name}</p>
            <p className={styles.ownerInfo}>{venue.owner.email}</p>
            <img
              src={venue.owner.avatar}
              alt="Owner Avatar"
              className={styles.ownerAvatar}
            />
          </div>
          <div className={styles.bookingsContainer}>
            <p className={styles.bookingsTitle}>Bookings:</p>
            {venue.bookings.map((booking, index) => (
              <div key={index} className={styles.bookingInfo}>
                <p>Date From: {booking.dateFrom}</p>
                <p>Date To: {booking.dateTo}</p>
                <p>Guests: {booking.guests}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default VenueDetails;
