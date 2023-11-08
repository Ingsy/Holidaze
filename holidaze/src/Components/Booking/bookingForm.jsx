import React, { useState } from "react";
import BaseButton from "../Buttons";
import styles from "./Booking.module.scss";
import { useAuth } from "../../Auth/context/AuthContext";

const defaultBookingData = {
  id: "",
  dateFrom: "",
  dateTo: "",
  guests: 0,
  venue: {},
};

export const BookingForm = ({
  formData,
  onFormChange,
  onBookingSubmit,
  venueId,
  maxGuests,
  onSave,
  onClose,
}) => {
  const [booking, setBooking] = useState(formData || defaultBookingData);
  const user = useAuth();

  const FormSubmit = (event) => {
    event.preventDefault();

    // Check if formData and formData.venue are defined
    if (formData && formData.venue) {
      const updatedBooking = {
        ...booking,
        venueId: venueId,
        venue: formData.venue,
      };
      onSave(updatedBooking, formData);
    } else {
      // Handle the case when formData or formData.venue is undefined
      // You can show an error message or take appropriate action.
      alert("Form data is missing or invalid. Please check your input.");
    }
  };

  const formCancel = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedBooking = {
      ...booking,
      [name]: value,
    };
    setBooking(updatedBooking);

    onFormChange(updatedBooking);
  };

  return (
    <div className={styles.bookingFormContainer}>
      <h2 className="text-center">Book Venue</h2>
      <form onSubmit={FormSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="dateFrom">Check-in date:</label>
          <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            value={booking.dateFrom}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dateTo">Check-out date:</label>
          <input
            type="date"
            id="dateTo"
            name="dateTo"
            value={booking.dateTo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="guests">Number of guests:</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={booking.guests}
            onChange={handleInputChange}
            min="1"
            max={maxGuests}
            required
          />
        </div>
        {user ? (
          <div className={styles.formGroup}>
            <BaseButton type="submit">Book Now</BaseButton>
            <BaseButton type="button" onClick={formCancel}>
              Cancel
            </BaseButton>
          </div>
        ) : (
          <p>Please log in to book a venue.</p>
        )}
      </form>
    </div>
  );
};

export default BookingForm;