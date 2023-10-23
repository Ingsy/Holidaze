import React, { useState, useEffect } from "react";
import BookingForm from "../Booking";
import styles from "./VenueDetails.module.css";
import modalStyles from "./modal.module.css";
import { useParams } from "react-router-dom";

function VenueDetails({ venueId }) {
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBookingSubmit = () => {
    console.log("Booking data:", formData);
    closeModal();
  };

  return (
    <div className={styles.detailsContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className={styles.venueName}>{venue.name}</h2>
          <p className={styles.venueDescription}>{venue.description}</p>
          <p className={styles.venuePrice}>Price: ${venue.price}</p>
          {venue.maxGuests !== undefined && (
            <p className={styles.venueMaxGuests}>
              Max Guests: {venue.maxGuests}
            </p>
          )}
          {venue.media && venue.media.length > 0 && (
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
          )}
          {venue.rating !== undefined && (
            <p className={styles.rating}>Rating: {venue.rating}</p>
          )}
          {venue.location && venue.location.address && (
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
              {venue.location.continent && (
                <p className={styles.locationInfo}>
                  Continent: {venue.location.continent}
                </p>
              )}
              {venue.location.lat !== undefined &&
                venue.location.lng !== undefined && (
                  <p className={styles.locationInfo}>
                    Latitude: {venue.location.lat}, Longitude:{" "}
                    {venue.location.lng}
                  </p>
                )}
            </div>
          )}
          <button onClick={openModal}>Book this Venue</button>
        </>
      )}
      {isModalOpen && (
        <div className={modalStyles.customModal}>
          <div className={modalStyles.modalContent}>
            <BookingForm
              formData={formData}
              onFormChange={setFormData}
              onBookingSubmit={handleBookingSubmit}
            />
            <div className={modalStyles.modalButtons}>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VenueDetails;
