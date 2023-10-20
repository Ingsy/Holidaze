import React, { useState } from "react";

function BookingForm() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1); // Default to 1 guest

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., make an API request to create a new booking
  };

  return (
    <div>
      <h2>Book a Venue</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="dateFrom">Check-in date:</label>
        <input
          type="date"
          id="dateFrom"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          required
        />

        <label htmlFor="dateTo">Check-out date:</label>
        <input
          type="date"
          id="dateTo"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          required
        />

        <label htmlFor="guests">Number of guests:</label>
        <input
          type="number"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          required
        />

        {/* Additional fields for user information (name, email, etc.) can be added here */}

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookingForm;
