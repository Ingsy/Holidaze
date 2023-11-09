import React from "react";

function BookingList({ bookings }) {
  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>Booking ID: {booking.id}</p>
          <p>Date: {booking.date}</p>
          <p>Guests: {booking.guests}</p>
          {/* Add more booking details as needed */}
        </div>
      ))}
    </div>
  );
}

export default BookingList;
