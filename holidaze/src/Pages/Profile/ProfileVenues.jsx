import React, { useState, useEffect } from "react";
import YourVenueGrid from "../../Components/VenueGrid/YourVenueGrid";
import { ProfileVenuesUrl } from "../../Auth/constants";
import { headers } from "../../Auth/utils/authFetch";

function ProfileVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestOptions = {
          method: "GET", // Use the appropriate HTTP method
          headers: headers(), // Include the Authorization header with the token
        };

        const response = await fetch(ProfileVenuesUrl, requestOptions);

        if (!response.ok) {
          // Handle the error
          const errorData = await response.json();
          console.error("Error:", errorData);
        } else {
          // Process the response
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
      <YourVenueGrid venues={venues} loading={loading} />
    </div>
  );
}

export default ProfileVenues;
