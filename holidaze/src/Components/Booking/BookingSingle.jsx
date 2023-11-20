import React from "react";
import { useHolidaizApi } from "../../Auth/constants";
import { BookingForm } from "./bookingForm";
import styles from "../../Styles/Booking.module.scss";

export const BookingSingle = ({ venueId, maxGuests }) => {
  const { bookings } = useHolidaizApi();

  const SingelBooking = (booking) => {
    bookings
      .getSingle(booking)
      .then((data) => {})
      .catch((error) => {});
  };
  return (
    <div className={`${styles.detailsContainer} mx-auto`}>
      <BookingForm
        venueId={venueId}
        maxGuests={maxGuests}
        SingelBooking={SingelBooking}
      />
    </div>
  );
};

export default BookingSingle;
