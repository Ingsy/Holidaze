import React, { useState, useEffect } from "react";
import YourVenueGrid from "../../Components/VenueGrid/YourVenueGrid";
import { useHolidaizApi } from "../../Auth/constants";
//import BookingList from "../../Components/Booking/BookingList";

export const ProfileBookings = () => {
  //const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bookings: holidaizBookings } = useHolidaizApi();

  useEffect(() => {
    async function fetchUserBookings() {
      try {
        const userBookings = await holidaizBookings.get({ _bookings: true });
        setVenues(userBookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        setLoading(false);
      }
    }

    fetchUserBookings();
  }, [holidaizBookings]);

  return (
    <div>
      <YourVenueGrid venues={venues} loading={loading} />
    </div>
  );
};

export default ProfileBookings;
