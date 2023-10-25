import React, { useState, useEffect } from "react";
import VenueGrid from "../VenueGrid";
function VenueList() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.noroff.dev/api/v1/holidaze/venues"
        );
        const data = await response.json();
        setVenues(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return <VenueGrid venues={venues} loading={loading} />;
}

export default VenueList;
