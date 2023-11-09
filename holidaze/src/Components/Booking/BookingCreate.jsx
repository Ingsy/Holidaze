import React from "react";
import { BookingForm } from "./bookingForm";
//import { createBooking } from "./bookingsAPI";
//import { useNavigate } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import styles from "./Booking.module.scss";

export const BookingCreate = ({ onCreateError, venueId, maxGuests }) => {
  console.log("Venue ID in BookingCreate:", venueId);
  //const navigate = useNavigate();
  const { bookings } = useHolidaizApi();

  const handleFormChange = (formData) => {
    console.log("Form data changed:", formData);
  };

  const onSave = (booking) => {
    bookings
      .create(booking)
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log("Create booking error", error);
        if (onCreateError) onCreateError(error);
      });
  };

  const onClose = () => {
    alert("Cancel create booking");
  };

  return (
    <div className={`${styles.detailsContainer} mx-auto`}>
      <BookingForm
        venueId={venueId}
        maxGuests={maxGuests}
        onSave={onSave}
        onClose={onClose}
        onFormChange={handleFormChange}
      />
    </div>
  );
};

export default BookingCreate;
