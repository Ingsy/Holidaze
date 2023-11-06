import React, { useState, useEffect } from "react";
import BookingForm from "../Booking";
import styles from "./Venue.module.css";
import { useParams } from "react-router-dom";
import BaseButton from "../Buttons";
import Modal from "../Modal";
import StarRating from "../StarRating";
import { deleteVenue } from "./venueAPI";
import { useAuth } from "../../Auth/context/AuthContext";
import Alert from "../Alert";
import { VenueUpdate } from "./VenueUpdate";

function Venue({ existingVenueData }) {
  const { id } = useParams();
  const { user, isLoading } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVenue, setEditVenue] = useState(false);
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });

  const [isUserOwner, setIsUserOwner] = useState(false);

  useEffect(() => {
    if (user) {
      fetchVenueDetails(id);
    }
  }, [id, user]);

  const fetchVenueDetails = (venueId) => {
    const fetchUrl = `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}?_owner=true`;

    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setVenue(data);
        setIsUserOwner(data.owner?.email === user.email);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching venue details:", error);
        setLoading(false);
      });
  };

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

  const handleUpdate = () => setEditVenue(true);

  const handleDelete = () => {
    if (user.token) {
      if (user.venueManager) {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this venue?"
        );

        if (confirmDelete) {
          deleteVenue(id, user.token)
            .then((response) => {
              console.log("Venue deleted successfully.");
              setShowAlert(true);
              setSuccessMessage("Venue is successfully deleted");
              setAlertType("success");
            })
            .catch((error) => {
              console.error("Error deleting venue:", error);
              setShowAlert(true);
              setErrorMessage("Error deleting venue");
              setAlertType("error");
            });
        }
      } else {
        setShowAlert(true);
        setErrorMessage("You need to be a Venue Manager to delete this venue.");
        setAlertType("error");
      }
    }
  };

  const onVenueUpdateError = (error) => {
    alert("Error updating");
  };

  /* if fetching user form auth0 or venues from api */
  if (isLoading || loading) return null;
  /* if editing venue */
  if (editVenue)
    return (
      <VenueUpdate
        venueData={venue}
        onVenueUpdateError={onVenueUpdateError}
        onClose={() => setEditVenue(false)}
      />
    );
  /* show venue */
  return (
    <div className={`${styles.detailsContainer} mx-auto`}>
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

        <p className={styles.venuePrice}>${venue.price} night</p>
        {venue.maxGuests !== undefined && (
          <p className={styles.venueMaxGuests}>
            {" "}
            Accommodates: {venue.maxGuests} guests
          </p>
        )}
        <p className={styles.venueDescription}>
          Description: {venue.description}
        </p>
        <div className="mt-3">
          <p>Amenities:</p>
          {Object.entries(venue.meta).map(([key, value]) => {
            if (value) {
              return (
                <p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
              );
            }
            return null;
          })}
        </div>
        {venue.rating !== undefined && (
          <div className="text-end">
            <StarRating rating={venue.rating} />
          </div>
        )}
      </>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <BookingForm
            formData={formData}
            onFormChange={setFormData}
            onBookingSubmit={handleBookingSubmit}
          />
        </Modal>
      )}

      {showAlert && (
        <Alert
          message={
            successMessage ||
            errorMessage ||
            "Default message if none specified"
          }
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}

      {isUserOwner && (
        <div className="text-center m-3">
          <BaseButton onClick={handleUpdate} className={styles.bookButton}>
            Update Venue
          </BaseButton>
          <BaseButton onClick={handleDelete} className={styles.bookButton}>
            Delete Venue
          </BaseButton>
        </div>
      )}

      {!isUserOwner && (
        <div className="text-center mt-4">
          <BaseButton onClick={openModal} className={styles.bookButton}>
            Book Venue
          </BaseButton>
        </div>
      )}
    </div>
  );
}

export default Venue;
