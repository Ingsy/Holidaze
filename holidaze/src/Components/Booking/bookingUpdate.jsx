import React, { useState } from "react";
import { BookingForm } from "./BookingForm";
import { useNavigate } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import Alert from "../Alert/Alert";
import styles from "../../Styles/Booking.module.scss";

export const BookingUpdate = ({
  selectedBookingId,
  bookingId,
  FormData,
  onFormChange,
  onVenueUpdateError,
  onClose,
}) => {
  const navigate = useNavigate();
  const { bookings } = useHolidaizApi();
  const [editBooking, setEditBooking] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const onSave = async (booking) => {
    setEditBooking(true);

    try {
      await bookings.update(selectedBookingId, {
        dateFrom: booking.dateFrom,
        dateTo: booking.dateTo,
        guests: booking.guests,
      });
      setAlert((prevAlert) => ({
        ...prevAlert,
        message: "Booking updated successfully",
        type: "success",
      }));

      setTimeout(() => {
        console.log("Before navigate");
        navigate(0);
        console.log("After navigate");
      }, 4000);
    } catch (error) {
      if (onVenueUpdateError) onVenueUpdateError(error);
      setAlert((prevAlert) => ({
        ...prevAlert,
        message: "Failed to update booking",
        type: "error",
      }));
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
        isUpdating={true}
      />
    </div>
  );
};

export default BookingUpdate;
