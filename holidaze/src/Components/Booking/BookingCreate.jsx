import React from "react";
import { BookingForm } from "./bookingForm";
//import { createBooking } from "./bookingsAPI";
//import { useNavigate } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import styles from "../../Styles/Booking.module.scss";

export const BookingCreate = ({ onCreateError, venueId, maxGuests }) => {
  //const navigate = useNavigate();
  const { bookings } = useHolidaizApi();

  const handleFormChange = (formData) => {};

  const onSave = (booking) => {
    bookings
      .create(booking)
      .then((data) => {
        const alertMessage = `Booking successful!\n\nDetails:\nVenue ID: ${booking.venueId}\nCheck-in: ${booking.dateFrom}\nCheck-out: ${booking.dateTo}\nGuests: ${booking.guests}`;
        window.alert(alertMessage);
        window.location.reload();
      })
      .catch((error) => {
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
        isUpdating={false}
      />
    </div>
  );
};

export default BookingCreate;
