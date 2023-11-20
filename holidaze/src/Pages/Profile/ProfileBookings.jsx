import React, { useState, useEffect } from "react";
import BookingsForVenue from "../../Components/Booking/BookingsForVenue";
import { AllBookingsByProfile } from "../../Auth/constants/useHolidazeAPI";
import { useAuth } from "../../Auth/context/AuthContext";
import { headers } from "../../Auth/utils/authFetch";

function ProfileBookings() {
  const { user, isLoading } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (user.token) {
          const response = await fetch(AllBookingsByProfile, {
            method: "GET",
            headers: headers(),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching bookings - API error:", errorData);
          } else {
            const bookingsData = await response.json();
            console.log("Bookings data:", bookingsData);
            setBookings(bookingsData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [user.token]);

  return <BookingsForVenue bookings={bookings} loading={isLoading} />;
}

export default ProfileBookings;
