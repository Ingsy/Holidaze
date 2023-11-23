import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classnames from "classnames";
import { useHolidaizApi } from "../../Auth/constants";
import styles from "../../Styles/Booking.module.scss";

export const BookingDates = ({ venueId }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const { venues } = useHolidaizApi();

  useEffect(() => {
    venues
      .getVenueBookings(venueId)
      .then((response) => {
        const bookingsArray = response.bookings;
        if (!Array.isArray(bookingsArray)) {
          setBookedDates([]);
          return;
        }

        const bookedDatesArray = bookingsArray.map((booking) => ({
          startDate: new Date(booking.dateFrom),
          endDate: new Date(booking.dateTo),
          key: "booked",
          color: "#000000",
        }));

        setBookedDates(bookedDatesArray);
      })
      .catch((error) => {
        console.error("Error fetching venue bookings:", error);
      });
  }, [venueId]);

  const isDateBooked = (date) => {
    return bookedDates.some(
      (bookedDate) => date >= bookedDate.startDate && date <= bookedDate.endDate
    );
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        filterDate={(date) => !isDateBooked(date)}
        dayClassName={(date) =>
          classnames({
            [styles.bookedDate]: isDateBooked(date),
          })
        }
      />
    </div>
  );
};

export default BookingDates;
