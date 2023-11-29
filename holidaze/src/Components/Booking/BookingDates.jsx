/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classnames from "classnames";
import { useHolidaizApi } from "../../Auth/constants";
import styles from "../../Styles/Booking.module.scss";
/**
 * Component for selecting booking dates using the `react-datepicker` library.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.venueId - The ID of the venue for which bookings are fetched.
 * @param {Date} props.selected - The selected date.
 * @param {Function} props.onChange - Callback function called when the selected date changes.
 * @param {string} props.name - The name of the date input.
 * @returns {JSX.Element} Rendered React component.
 */
export const BookingDates = ({ venueId, selected, onChange, name }) => {
  /**
   * State to store the array of booked dates fetched from the API.
   * @type {Array}
   */
  const [bookedDates, setBookedDates] = useState([]);

  /**
   * Custom hook to access the Holidaiz API.
   */
  const { venues } = useHolidaizApi();

  /**
   * Fetches venue bookings from the API when the `venueId` prop changes.
   * @param {string} venueId - The ID of the venue.
   */
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

  /**
   * Checks if a given date is booked.
   * @param {Date} date - The date to check.
   * @returns {boolean} `true` if the date is booked, `false` otherwise.
   */
  const isDateBooked = (date) => {
    return bookedDates.some(
      (bookedDate) => date >= bookedDate.startDate && date <= bookedDate.endDate
    );
  };

  /**
   * Renders the date picker component.
   * @returns {JSX.Element} Rendered date picker.
   */
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
