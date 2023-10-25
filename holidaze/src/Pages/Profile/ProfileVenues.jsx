import { ProfileVenuesUrl } from "../../Auth/constants";
import React, { useState, useEffect } from "react";
import VenueGrid from "../../Components/VenueGrid";

function ProfileVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(ProfileVenuesUrl);
        if (response.ok) {
          const data = await response.json();
          setVenues(data);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch users venues");
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
      <h1>Your Venues</h1>
      <VenueGrid venues={venues} loading={loading} />
    </div>
  );
}

export default ProfileVenues;
