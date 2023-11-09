import React, { useState, useEffect } from "react";
import YourVenueGrid from "../../Components/VenueGrid/YourVenueGrid";
import { useHolidaizApi } from "../../Auth/constants";
import BookingList from "../../Components/Booking/BookingList";

export const ProfileBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bookings: holidaizBookings } = useHolidaizApi(); // Using 'holidaizBookings' to avoid redeclaration

  useEffect(() => {
    async function fetchUserBookings() {
      try {
        console.log("Fetching user bookings...");
        const userBookings = await holidaizBookings.get(); // Use 'GET' to retrieve user bookings
        console.log("User bookings retrieved:", userBookings);

        setBookings(userBookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        setLoading(false);
      }
    }

    fetchUserBookings();
  }, [holidaizBookings]);

  console.log("Bookings in state:", bookings);

  return (
    <div>
      <BookingList bookings={bookings} />
    </div>
  );
};

export default ProfileBookings;
