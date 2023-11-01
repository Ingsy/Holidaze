import React, { useState, useEffect } from "react";
import VenueGrid from "../../Components/VenueGrid";
import { ProfileBookingsUrl } from "../../Auth/constants";
import { headers } from "../../Auth/utils/authFetch";

function ProfileBookings() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <VenueGrid venues={venues} loading={loading} />
    </div>
  );
}

export default ProfileBookings;
