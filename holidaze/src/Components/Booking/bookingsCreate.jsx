import React from "react";
import BookingForm from "./index";
import { createBooking } from "./bookingsAPI";

const bookingsCreate = ({ venueId, maxGuests, onBookingSubmit }) => {
  const handlecreateBooking = (bookingData) => {
    createBooking(bookingData)
      .then((response) => {
        console.log("Booking created:", response.data);
        onBookingSubmit();
      })
      .catch((error) => {});
  };

  return (
    <div>
      <h2>Create Booking</h2>
      <BookingForm
        onFormChange={(formData) => {}}
        onBookingSubmit={() => {}}
        venueId={venueId}
        maxGuests={maxGuests}
        onSave={handlecreateBooking}
        onClose={() => {}}
      />
    </div>
  );
};

export default bookingsCreate;
