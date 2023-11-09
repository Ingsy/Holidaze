import React from "react";
import { BookingForm } from "./bookingForm";
import { useNavigate } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import styles from "../../Styles/Booking.module.scss";

export const BookingUpdate = ({
  bookingData,
  onBookingUpdateError,
  onClose,
}) => {
  const navigate = useNavigate();
  const { bookings } = useHolidaizApi();

  const onSave = (booking) => {
    bookings
      .update(booking.id, booking)
      .then((data) => navigate(`/booking/${booking.id}`))
      .catch((error) => {
        console.log("Update booking error", error);
        if (onBookingUpdateError) onBookingUpdateError(error);
      });
  };

  return (
    <div className={`${styles.detailsContainer} mx-auto`}>
      <BookingForm
        bookingData={bookingData}
        onSave={onSave}
        onClose={onClose}
      />
    </div>
  );
};
