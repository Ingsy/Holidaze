import React from "react";
import { useNavigate } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import styles from "../../Styles/Booking.module.scss";

export const BookingDelete = ({
  bookingData,
  onBookingDeleteError,
  onClose,
}) => {
  const navigate = useNavigate();
  const { bookings } = useHolidaizApi();

  const onDelete = (bookingId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (isConfirmed) {
      bookings
        .delete(bookingId)
        .then(() => {
          navigate("/profile");
        })
        .catch((error) => {
          console.log("Delete booking error", error);
          if (onBookingDeleteError) onBookingDeleteError(error);
        });
    }
  };

  return (
    <div className={`${styles.detailsContainer} mx-auto`}>
      <div>
        <p>Are you sure you want to delete this booking?</p>
        <button onClick={() => onDelete(bookingData.id)}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
