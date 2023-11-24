/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import styles from "../../Styles/BookingsForVenue.module.scss";
import { useNavigate } from "react-router-dom";
import BookingUpdate from "./BookingUpdate";
import { useHolidaizApi } from "../../Auth/constants";

function formatDate(dateString) {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
}

function BookingsForVenue({ venueId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bookings: BookingsApi, profile, venues } = useHolidaizApi();
  const navigate = useNavigate();
  const [editBooking, setEditBooking] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleFormChange = (updatedBooking) => {
    console.log("Form changes within BookingsForVenue:", updatedBooking);
  };

  useEffect(() => {
    async function fetchBookings() {
      try {
        let response;

        if (venueId) {
          response = await venues.getVenueBookings(venueId);
        } else {
          response = await profile.get();
        }

        setBookings(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    }

    fetchBookings();
  }, [venueId]);

  const handleCheckoutVenue = (bookingId) => {
    BookingsApi.getSingle(bookingId).then((response) => {
      const venueId = response?.venue?.id;
      if (venueId) {
        navigate(`/venue/${venueId}`);
      } else {
        console.error("Venue ID not found in the booking details:", response);
      }
    });
  };

  const handleUpdate = (bookingId) => {
    setSelectedBookingId(bookingId);
    setEditBooking(true);
  };

  const handleDelete = (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (confirmDelete) {
      BookingsApi.delete(bookingId)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting venue:", error);
        });
    }
  };

  const onBookingUpdateError = (error) => {
    alert("Error updating");
  };

  if (editBooking) {
    return (
      <BookingUpdate
        selectedBookingId={selectedBookingId}
        BookingData={bookings}
        onBookingUpdateError={onBookingUpdateError}
        onFormChange={handleFormChange}
        onClose={() => setEditBooking(false)}
      />
    );
  }

  return (
    <div className={styles.bookingsContainer}>
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div>
          {bookings.length > 0 ? (
            <ul className="mt-5">
              {bookings.map((booking) => (
                <li key={booking.id} className={`${styles.bookingItem} mb-4`}>
                  <p className={`${styles.BookingId} text-start`}>
                    Booking ID: {booking.id}
                  </p>
                  <div className={styles.BookingId}>
                    <span className="me-2">
                      created: {formatDate(booking.created)}
                    </span>
                    <span>updated: {formatDate(booking.updated)}</span>
                  </div>
                  <hr />
                  <button
                    onClick={() => {
                      handleCheckoutVenue(booking.id);
                    }}
                    className={styles.venueButton}
                  >
                    Checkout Venue
                  </button>
                  <p className="mt-3">
                    Check-in Date: {formatDate(booking.dateFrom)}
                  </p>
                  <p className="mt-1">
                    Check-out Date: {formatDate(booking.dateTo)}
                  </p>
                  <p className="mt-1">Guests: {booking.guests}</p>
                  <hr />
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      onClick={() => {
                        handleUpdate(booking.id);
                      }}
                      className={styles.pagButton}
                    >
                      Edit booking
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(booking.id);
                      }}
                      className={styles.pagButton}
                    >
                      Delete booking
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>There are currently no bookings.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingsForVenue;
