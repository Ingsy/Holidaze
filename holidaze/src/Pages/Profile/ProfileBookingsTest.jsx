import React, { useState, useEffect } from "react";
//import YourVenueGrid from "../../Components/VenueGrid/YourVenueGrid";
import { ProfileBookingsUrl } from "../../Auth/constants/useHolidazeAPI";
import { headers } from "../../Auth/utils/authFetch";
import BookingList from "../../Components/Booking/BookingList";

function ProfileBookings() {
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestOptions = {
          method: "GET",
          headers: headers(),
        };

        const response = await fetch(ProfileBookingsUrl, requestOptions);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData);
        } else {
          const data = await response.json();
          setVenues(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return <BookingList venues={venues} loading={loading} />;
}

export default ProfileBookings;
