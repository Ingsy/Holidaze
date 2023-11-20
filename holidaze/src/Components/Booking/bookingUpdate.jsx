import React, { useState } from "react";
import { BookingForm } from "./bookingForm";
import { useNavigate } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import Alert from "../Alert";
import styles from "../../Styles/Booking.module.scss";

export const BookingUpdate = ({
  selectedBookingId,
  bookingId,
  FormData,
  onFormChange,
  onVenueUpdateError,
  onClose,
}) => {
  console.log("Props in BookingUpdate:", { selectedBookingId, bookingId });
  const navigate = useNavigate();
  const { bookings } = useHolidaizApi();
  const [editBooking, setEditBooking] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const onSave = async (booking) => {
    console.log("Selected Booking ID:", selectedBookingId);
    setEditBooking(true);

    try {
      console.log("Saving booking:", booking);
      await bookings.update(selectedBookingId, {
        dateFrom: booking.dateFrom,
        dateTo: booking.dateTo,
        guests: booking.guests,
      });
      setAlert({ message: "Booking updated successfully", type: "success" });
      navigate(`/booking/${selectedBookingId}`);
    } catch (error) {
      console.log("Update booking error", error);
      if (onVenueUpdateError) onVenueUpdateError(error);
      setAlert({ message: "Failed to update booking", type: "error" });
    }
  };

  return (
    <div className={`${styles.detailsContainer} mx-auto`}>
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
      <BookingForm
        bookingData={FormData}
        onSave={onSave}
        onClose={onClose}
        editBooking={editBooking}
        onFormChange={onFormChange}
        bookingId={selectedBookingId}
      />
    </div>
  );
};

export default BookingUpdate;
