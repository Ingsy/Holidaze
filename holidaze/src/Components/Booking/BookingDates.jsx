/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classnames from "classnames";
import { useHolidaizApi } from "../../Auth/constants";
import styles from "../../Styles/Booking.module.scss";

export const BookingDates = ({ venueId, selected, onChange, name }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const { venues } = useHolidaizApi();

  useEffect(() => {
    if (venueId) {
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
    }
  }, [venueId]);

  const isDateBooked = (date) => {
    return bookedDates.some(
      (bookedDate) => date >= bookedDate.startDate && date <= bookedDate.endDate
    );
  };

  return (
    <DatePicker
      selected={selected}
      onChange={(date) => onChange(name, date)}
      filterDate={(date) => !isDateBooked(date)}
      dayClassName={(date) =>
        classnames({
          [styles.bookedDate]: isDateBooked(date),
        })
      }
      wrapperClassName={styles.datepicker}
    />
  );
};

export default BookingDates;
