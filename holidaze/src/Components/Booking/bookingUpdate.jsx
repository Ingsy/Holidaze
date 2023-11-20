import React, { useState } from "react";
import { BookingForm } from "./bookingForm";
import { useNavigate, useParams } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import Alert from "../Alert";
import styles from "../../Styles/Booking.module.scss";

export const BookingUpdate = ({ FormData, onVenueUpdateError, onClose }) => {
  const { id: BookingId } = useParams();
  const navigate = useNavigate();
  const { bookings } = useHolidaizApi();
  const [editBooking, setEditBooking] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const onSave = async (booking) => {
    setEditBooking(true);

    try {
      await bookings.update(booking.id, booking);
      setAlert({ message: "Booking updated successfully", type: "success" });
      navigate(`/venue/${BookingId}`);
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
      />
    </div>
  );
};
