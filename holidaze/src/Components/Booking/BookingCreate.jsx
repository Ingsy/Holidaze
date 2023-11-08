import React from "react";
import { BookingForm } from "./bookingForm";
import { createBooking } from "./bookingsAPI";
import { useNavigate } from "react-router-dom";

import styles from "./Booking.module.scss";

export const BookingCreate = ({ onCreateError, venueId, maxGuests }) => {
  console.log("Venue ID in BookingCreate:", venueId);
  const navigate = useNavigate();

  const handleFormChange = (formData) => {
    console.log("Form data changed:", formData);
  };

  const onSave = (booking, formData) => {
    console.log("Booking object before setting venueId:", booking);
    booking.venueId = formData.venueId;
    console.log("Booking object after setting venueId:", booking);
    createBooking(booking)
      .then((data) => {
        navigate(`/booking/${data.id}`);
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
