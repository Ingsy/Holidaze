/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BaseButton from "../Buttons/BaseButton";
import Modal from "../Modal/Modal";
import StarRating from "../StarRating/StarRating";
import { useAuth } from "../../Auth/context/AuthContext";
import Alert from "../Alert/Alert";
import { VenueUpdate } from "./VenueUpdate";
import BookingCreate from "../Booking/BookingCreate";
import { useHolidaizApi } from "../../Auth/constants";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/Venue.module.scss";
import BookingsForVenue from "../Booking/BookingsForVenue";

function Venue() {
  const { id } = useParams();

  const { venues } = useHolidaizApi();
  const { user, isLoading } = useAuth();

  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [venue, setVenue] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVenue, setEditVenue] = useState(false);
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });

  const navigate = useNavigate();
  const [isUserOwner, setIsUserOwner] = useState(false);
  const { venues: holidaizVenues } = useHolidaizApi();

  useEffect(() => {
    // Wait until we know we are logged in or not to fetch venue details
    if (!isLoading) {
      fetchVenueDetails(id);
    }
  }, [id, isLoading]);

  const fetchVenueDetails = async (venueId) => {
    try {
      const venueData = await holidaizVenues.getVenueId(venueId);

      setVenue(venueData);
      console.log(venueData.owner?.email === user?.email);
      setIsUserOwner(venueData.owner?.email === user?.email);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching venue details:", error);
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVenue(null);
    setIsModalOpen(false);
  };

  const handleBookingSubmit = () => {
    closeModal();
  };

  const handleBookingsClick = (venueId) => {
    setSelectedVenue(venueId);
    venues
      .getVenueBookings(venueId)
      .then((response) => {
        console.log("Bookings for venue:", response);
      })
      .catch((error) => {
        console.error("Error fetching venue bookings:", error);
      });
  };

  const handleUpdate = () => setEditVenue(true);

  const handleDelete = () => {
    if (user.token) {
      if (user.venueManager) {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this venue?"
        );

        if (confirmDelete) {
          venues
            .delete(id, user.token)
            .then((response) => {
              setShowAlert(true);
              setSuccessMessage("Venue is successfully deleted");
              setAlertType("success");

              setTimeout(() => {
                setShowAlert(false);
                navigate("/profile");
              }, 4000);
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

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
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
        <h2 className={`${styles.venueName} text-center`}>{venue.name}</h2>
        <div className={styles.header}>
          <div className={styles.titleLine}></div>
        </div>
        {venue.media && (
          <div className="row">
            {venue.media.length > 0 && (
              <div className="col-12 col-md-8 text-center">
                <img
                  src={venue.media[0]}
                  alt={`Venue 1`}
                  className={styles.firstPhoto}
                />
              </div>
            )}

            {venue.media.length > 1 ? (
              <div className="col-12 col-md-4 d-flex flex-wrap flex-md-row mt-2 mb-2 mt-md-0 mb-md-0">
                <div className={`${styles.smallPhotosContainer} overflow-auto`}>
                  {venue.media.slice(1).map((photo, index) => (
                    <div key={index} className={styles.smallPhoto}>
                      <img src={photo} alt={`Venue ${index + 2}`} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-12 col-md-6 col-md-offset-3 d-flex flex-column mt-4">
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
            )}
          </div>
        )}
        <div className={styles.titleLine}></div>
        <p className={styles.venuePrice}>${venue.price} night</p>
        {venue.maxGuests !== undefined && (
          <p className={styles.venueMaxGuests}>
            {" "}
            Accommodates: {venue.maxGuests} guests
          </p>
        )}

        <div>
          <p>Amenities:</p>
          {venue &&
            venue.meta &&
            Object.entries(venue.meta).map(([key, value]) => {
              if (value) {
                return (
                  <p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                );
              }
              return null;
            })}
        </div>
        <p className={`${styles.venueDescription} mt-2`}>
          Description: {venue.description}
        </p>
        <div className={styles.header}>
          <div className={styles.titleLine}></div>
        </div>
        <div className={styles.ownerInfo}>
          <div>
            {venue.owner && (
              <>
                {venue.owner.avatar && isValidURL(venue.owner.avatar) && (
                  <img
                    src={venue.owner.avatar}
                    alt={`Host Avatar`}
                    className={styles.hostAvatar}
                  />
                )}
                {venue.owner.name && (
                  <p className={styles.venueDescription}>{venue.owner.name}</p>
                )}
                {venue.owner.email && (
                  <p className={styles.venueDescription}>{venue.owner.email}</p>
                )}
              </>
            )}
          </div>
          {venue.rating !== undefined && (
            <div className={styles.starRating}>
              <StarRating rating={venue.rating} />
            </div>
          )}
        </div>
      </>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <BookingCreate
            venueId={venue.id}
            formData={formData}
            onFormChange={setFormData}
            maxGuests={venue.maxGuests}
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
          <BaseButton
            className={styles.ButtonsBooking}
            onClick={() => {
              handleBookingsClick(venue.id);
              //openModal();
            }}
          >
            Bookings
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
      <div className="text-center mt-4">
        <Link to="/" className={styles.Link}>
          Explore venues
        </Link>{" "}
      </div>

      <Modal isOpen={selectedVenue !== null} onClose={closeModal}>
        {selectedVenue && <BookingsForVenue venueId={selectedVenue} />}
      </Modal>
    </div>
  );
}

export default Venue;
