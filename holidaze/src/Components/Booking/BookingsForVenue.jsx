import React, { useState, useEffect } from "react";
import { AllBookingsByProfile } from "../../Auth/constants";
import { headers } from "../../Auth/utils/authFetch";
import { BookingUpdate } from "./BookingUpdate";
//import { useAuth } from "../../Auth/context/AuthContext";
import styles from "../../Styles/BookingsForVenue.module.scss";

function formatDate(dateString) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
}

function BookingsForVenue({ venueId }) {
  const [bookings, setBookings] = useState([]);
  //const { user, isLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [editBooking, setEditBooking] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const requestOptions = {
          method: "GET",
          headers: headers(),
        };

        const response = await fetch(`${AllBookingsByProfile}`, requestOptions);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData);
        } else {
          const data = await response.json();
          setBookings(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    }

    fetchBookings();
  }, [venueId, page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleUpdate = () => setEditBooking(true);
  const handleDelete = () => {};

  const onBookingUpdateError = (error) => {
    alert("Error updating");
  };

  if (editBooking)
    return (
      <BookingUpdate
        BookingData={bookings}
        onBookingUpdateError={onBookingUpdateError}
        onClose={() => setEditBooking(false)}
      />
    );

  return (
    <div className={styles.bookingsContainer}>
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div>
          <ul className="mt-5 text-center">
            {bookings.map((booking) => (
              <li key={booking.id} className={`${styles.bookingItem} mb-4`}>
                {/* Display booking information here */}
                <p className={`${styles.BookingId} text-start`}>
                  Booking ID: {booking.id}
                </p>
                <p className="text-start">
                  Check-in Date: {formatDate(booking.dateFrom)}
                </p>
                <p className="text-start">
                  Check-out Date: {formatDate(booking.dateTo)}
                </p>
                <p className="text-start">Guests: {booking.guests}</p>
                <div className="d-flex justify-content-center mt-3">
                  <button onClick={handleUpdate} className={styles.pagButton}>
                    Edit booking
                  </button>
                  <button onClick={handleDelete} className={styles.pagButton}>
                    Delete booking
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div
            className={`${styles.paginationContainer} justify-content-center`}
          >
            <button
              className={styles.pagButton}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="ms-2 me-2">{page}</span>
            <button
              className={styles.pagButton}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingsForVenue;
