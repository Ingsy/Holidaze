import React from "react";
import { useAuth } from "../../Auth/context/AuthContext";
import BaseButton from "../Buttons";
import styles from "./Booking.module.scss";

function BookingForm({
  formData,
  onFormChange,
  onBookingSubmit,
  venueId,
  maxGuests,
}) {
  const user = useAuth();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (user && user.token) {
      if (formData.guests > maxGuests) {
        console.error("Number of guests exceeds the maximum allowed.");
        return;
      }

      const bookingData = {
        dateFrom: formData.dateFrom,
        dateTo: formData.dateTo,
        guests: formData.guests,
        venueId: venueId,
      };

      fetch("https://api.noroff.dev/api/v1/holidaze/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to create booking");
          }
        })
        .then((data) => {
          console.log("Booking created:", data);
          onBookingSubmit();
        })
        .catch((error) => {
          console.error("Booking creation error:", error);
        });
    } else {
      console.error("User not authenticated or token unavailable.");
    }
  };

  return (
    <div className={styles.bookingFormContainer}>
      <h2 className="text-center">Book Venue</h2>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="dateFrom">Check-in date:</label>
          <input
            type="date"
            id="dateFrom"
            value={formData.dateFrom}
            onChange={(e) =>
              onFormChange({ ...formData, dateFrom: e.target.value })
            }
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dateTo">Check-out date:</label>
          <input
            type="date"
            id="dateTo"
            value={formData.dateTo}
            onChange={(e) =>
              onFormChange({ ...formData, dateTo: e.target.value })
            }
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="guests">Number of guests:</label>
          <input
            type="number"
            id="guests"
            value={formData.guests}
            onChange={(e) =>
              onFormChange({ ...formData, guests: e.target.value })
            }
            min="1"
            max={maxGuests}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <BaseButton type="submit">Book Now</BaseButton>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
