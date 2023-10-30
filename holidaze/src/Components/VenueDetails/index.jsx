import React, { useState, useEffect } from "react";
import BookingForm from "../Booking";
import styles from "./VenueDetails.module.css";
import { useParams } from "react-router-dom";
import BaseButton from "../Buttons";
import Modal from "../Modal";
import StarRating from "../StarRating";

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
    <div className={`${styles.detailsContainer} mx-auto`}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className={`${styles.venueName} text-end`}>{venue.name}</h2>
          <div className={styles.header}>
            <div className={styles.titleLine}></div>
          </div>

          {venue.media && (
            <div className="row">
              <div className="col-12 col-md-6 text-center">
                <img
                  src={venue.media[0]}
                  alt={`Venue 1`}
                  className={styles.firstPhoto}
                />
              </div>
              <div className="col-12 col-md-3 d-flex justify-content-center flex-wrap flex-md-row">
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
                    {venue.media.length === 1 ? (
                      <div className={styles.smallPhoto}>
                        <img
                          src="https://picsum.photos/seed/picsum/200/300"
                          alt="Placeholder 3"
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="col-12 col-md-3 d-flex flex-column">
                {venue.location && venue.location.address && (
                  <div
                    className={`d-flex flex-column ${styles.locationContainer}`}
                  >
                    <p className="flex-grow-1">
                      Address: {venue.location.address}
                    </p>
                    <p className="flex-grow-1">City: {venue.location.city}</p>
                    <p className="flex-grow-1">Zip: {venue.location.zip}</p>
                    <p className="flex-grow-1">
                      Country: {venue.location.country}
                    </p>
                    {venue.location.continent && (
                      <p className="flex-grow-1">
                        Continent: {venue.location.continent}
                      </p>
                    )}
                    {venue.location.lat !== undefined &&
                      venue.location.lng !== undefined && (
                        <p className="flex-grow-1">
                          Lat: {venue.location.lat}, Long: {venue.location.lng}
                        </p>
                      )}
                  </div>
                )}
              </div>
            </div>
          )}

          <p className={styles.venuePrice}>Price: ${venue.price}</p>
          {venue.maxGuests !== undefined && (
            <p className={styles.venueMaxGuests}>
              Max Guests: {venue.maxGuests}
            </p>
          )}
          <p className={styles.venueDescription}>{venue.description}</p>
          {venue.rating !== undefined && (
            <p className="text-end">
              <StarRating rating={venue.rating} />
            </p>
          )}

          <div className={styles.bottomLine}></div>
          <div className="text-center mt-4">
            <BaseButton onClick={openModal} className={styles.bookButton}>
              Book Venue
            </BaseButton>
          </div>
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
