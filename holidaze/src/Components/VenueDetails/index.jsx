import React, { useState, useEffect } from "react";
import BookingForm from "../Booking";
import styles from "./VenueDetails.module.css";
import { useParams } from "react-router-dom";
import BaseButton from "../Buttons";
import Modal from "../Modal";

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
    <div
      className={styles.detailsContainer}
      style={{ backgroundColor: "#F2F2F2" }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className={styles.venueName}>{venue.name}</h2>
          <div className={styles.header}>
            <div className={styles.titleLine}></div>
          </div>

          <p className={styles.venueDescription}>{venue.description}</p>
          <p className={styles.venuePrice}>Price: ${venue.price}</p>

          {venue.maxGuests !== undefined && (
            <p className={styles.venueMaxGuests}>
              Max Guests: {venue.maxGuests}
            </p>
          )}
          {venue.media && (
            <div className={styles.photosContainer}>
              <img
                src={venue.media[0]}
                alt={`Venue 1`}
                className={styles.firstPhoto}
              />
              {venue.media.length > 1 ? (
                <div className={styles.smallPhotosContainer}>
                  {venue.media.slice(1).map((photo, index) => (
                    <div key={index} className={styles.smallPhoto}>
                      <img src={photo} alt={`Venue ${index + 2}`} />
                    </div>
                  ))}
                </div>
              ) : null}
              {/* Conditional rendering for placeholder images */}
              {venue.media.length < 4 ? (
                <div className={styles.smallPhotosContainer}>
                  {venue.media.length < 3 ? (
                    <div className={styles.smallPhoto}>
                      <img
                        src="https://picsum.photos/seed/picsum/200/300"
                        alt="Placeholder 1"
                      />
                    </div>
                  ) : null}
                  {venue.media.length < 2 ? (
                    <div className={styles.smallPhoto}>
                      <img
                        src="https://picsum.photos/seed/picsum/200/300"
                        alt="Placeholder 2"
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          )}

          {venue.rating !== undefined && (
            <p className={styles.rating}>Rating: {venue.rating}</p>
          )}

          {venue.location && venue.location.address && (
            <div className={styles.locationContainer}>
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

          <div className={styles.bottomLine}></div>

          <BaseButton onClick={openModal} className={styles.bookButton}>
            Book Venue
          </BaseButton>
        </>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <BookingForm
            formData={formData}
            onFormChange={setFormData}
            onBookingSubmit={handleBookingSubmit}
          />
        </Modal>
      )}
    </div>
  );
}

export default VenueDetails;
