import React from "react";
import BookingForm from "./BookingForm";
import { CreateBooking } from "./BookingAPI";

const bookingsCreate = ({ venueId, maxGuests, onBookingSubmit }) => {
  const handleCreateBooking = (bookingData) => {
    CreateBooking(bookingData)
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
        onSave={handleCreateBooking}
        onClose={() => {}}
      />
    </div>
  );
};

export default bookingsCreate;
