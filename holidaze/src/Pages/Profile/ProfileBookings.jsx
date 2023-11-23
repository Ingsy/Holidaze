import React, { useState, useEffect } from "react";
import BookingsForVenue from "../../Components/Booking/BookingsForVenue";
import { useAuth } from "../../Auth/context/AuthContext";
import { useHolidaizApi } from "../../Auth/constants/useHolidazeAPI";

function ProfileBookings() {
  const { profile } = useHolidaizApi();
  const { user, isLoading } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchProfileBookings() {
      try {
        if (user.token) {
          const bookingsData = await profile.get(user.token);
          setBookings(bookingsData);
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }

    fetchProfileBookings();
  }, [profile, user.token]);

  return <BookingsForVenue bookings={bookings} loading={isLoading} />;
}

export default ProfileBookings;
