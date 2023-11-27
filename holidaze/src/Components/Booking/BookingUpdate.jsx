import React, { useState } from "react";
import { BookingForm } from "./BookingForm";
import { useNavigate } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import Alert from "../Alert/Alert";
import styles from "../../Styles/Booking.module.scss";

export const BookingUpdate = ({
  selectedBooking,
  onFormChange,
  onBookingUpdateError,
  onClose,
}) => {
  const navigate = useNavigate();

  const { bookings } = useHolidaizApi();
  const [editBooking, setEditBooking] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  console.log("BookingUpdate", selectedBooking.venue.id);

  const onSave = async (booking) => {
    setEditBooking(true);

    try {
      await bookings.update(selectedBooking.id, {
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
      if (onBookingUpdateError) onBookingUpdateError(error);
      setAlert((prevAlert) => ({
        ...prevAlert,
        message: "Failed to update booking",
        type: "error",
      }));
    }
  };

  if (!selectedBooking) return null;

  return (
    <div className={`${styles.detailsContainer} mx-auto`}>
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
      <BookingForm
        formData={{
          ...selectedBooking,
          dateFrom: new Date(selectedBooking.dateFrom),
          dateTo: new Date(selectedBooking.dateTo),
        }}
        onSave={onSave}
        onClose={onClose}
        editBooking={editBooking}
        onFormChange={onFormChange}
        bookingId={selectedBooking.id}
        isUpdating={true}
        venueId={selectedBooking.venue.id}
        maxGuests={selectedBooking.venue.maxGuests}
      />
    </div>
  );
};

export default BookingUpdate;
