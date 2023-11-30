/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import styles from "../../Styles/BookingsForVenue.module.scss";
import { useNavigate } from "react-router-dom";
import BookingUpdate from "./BookingUpdate";
import { useHolidaizApi } from "../../Auth/constants";

export function formatDate(dateString) {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-GB",
    options
  );
  return formattedDate;
}

// Booking for a venue OR profile
function BookingsForVenue({ venueId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bookings: BookingsApi, profile, venues } = useHolidaizApi();
  const navigate = useNavigate();

  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleFormChange = (updatedBooking) => {
    console.log("Form changes within BookingsForVenue:", updatedBooking);
  };

  useEffect(() => {
    async function fetchBookings() {
      try {
        let response;

        if (venueId) {
          const venueData = await venues.getVenueBookings(venueId);
          response = venueData.bookings;
        } else {
          response = await profile.get();
        }

        const bookingsWithCustomerInfo = await Promise.all(
          response.map(async (booking) => {
            // Fetch customer information for the specific booking
            const customer = await BookingsApi.getCustomer(booking.id);
            console.log(
              "Fetched customer for booking",
              booking.id,
              ":",
              customer
            );
            return {
              ...booking,
              customer,
            };
          })
        );

        setBookings(bookingsWithCustomerInfo);
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

  const handleUpdate = (booking) => {
    setSelectedBooking(booking);
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

  if (selectedBooking) {
    return (
      <BookingUpdate
        selectedBooking={selectedBooking}
        onBookingUpdateError={onBookingUpdateError}
        onFormChange={handleFormChange}
        onClose={() => setSelectedBooking(null)}
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
                  <div className="d-flex flex-column justify-content-center mt-3">
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
                    {!venueId && <hr />}
                    {!venueId && (
                      <div className="d-flex justify-content-center mt-3">
                        <button
                          onClick={() => {
                            handleUpdate(booking);
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
                    )}
                  </div>
                  {venueId && booking.customer && (
                    <div className={`${styles.customerInfoContainer} mt-3`}>
                      <p className={styles.customerLabel}>Customer:</p>
                      <hr className={styles.hrStyle} />
                      <p className={styles.customerDetail}>
                        Name: {booking.customer.customer.name}
                      </p>
                      <p className={styles.customerDetail}>
                        Email: {booking.customer.customer.email}
                      </p>
                    </div>
                  )}
                  {console.log(
                    "booking.customer:",
                    JSON.stringify(booking.customer, null, 2)
                  )}
                  {console.log("venueId:", venueId)}
                  {console.log("booking.customer:", booking.customer)}
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
