import React, { useState, useEffect } from "react";
import { BookingsForVenueUrl } from "../../Auth/constants";
import { headers } from "../../Auth/utils/authFetch";
import styles from "../../Styles/BookingsForVenue.scss";

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
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const requestOptions = {
          method: "GET",
          headers: headers(),
        };

        const response = await fetch(
          `${BookingsForVenueUrl}?venueId=${venueId}&limit=${pageSize}&offset=${
            (page - 1) * pageSize
          }`,
          requestOptions
        );

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

  return (
    <div className={styles.bookingsContainer}>
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div>
          <ul className="mt-5">
            {bookings.map((booking) => (
              <li key={booking.id} className={`${styles.bookingItem} mb-4`}>
                {/* Display booking information here */}
                <p>Booking ID: {booking.id}</p>
                <p>Check-in Date: {formatDate(booking.dateFrom)}</p>
                <p>Check-out Date: {formatDate(booking.dateTo)}</p>
                <p>Guests: {booking.guests}</p>
                <hr />
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
          <div className={styles.paginationContainer}>
            {/* Pagination controls */}
            <button
              className="mx-3"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous Page
            </button>
            <span>Page {page}</span>
            <button className="m-3" onClick={() => handlePageChange(page + 1)}>
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingsForVenue;
