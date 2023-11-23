/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import YourVenueGrid from "../../Components/VenueGrid/YourVenueGrid";
import { useHolidaizApi } from "../../Auth/constants/useHolidazeAPI";

function ProfileVenues(openCreateVenueForm) {
  const { profile } = useHolidaizApi();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileVenues() {
      try {
        const venuesData = await profile.getVenues();
        setVenues(venuesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setLoading(false);
      }
    }

    fetchProfileVenues();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <YourVenueGrid
          venues={venues}
          loading={loading}
          openCreateVenueForm={openCreateVenueForm}
        />
      )}
    </div>
  );
}

export default ProfileVenues;
