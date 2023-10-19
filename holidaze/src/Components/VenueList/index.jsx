import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./VenueList.module.css";

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

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {venues.map((venue) => (
            <div key={venue.id} className="col-lg-3 col-md-4 col-sm-12">
              <div className={styles.venueCard}>
                <h2 className={`${styles.venueName} text-center`}>
                  {venue.name}
                </h2>
                {venue.media.length > 0 && (
                  <img
                    src={venue.media[0]} // Display the first media URL
                    alt={`Venue Media`}
                    className={styles.media}
                  />
                )}
                <p className={styles.venuePrice}>Price: ${venue.price}</p>
                <p className={styles.venueMaxGuests}>
                  Max Guests: {venue.maxGuests}
                </p>
                <p className={styles.venueRating}>Rating: {venue.rating}</p>

                <Link to={`/venue/${venue.id}`}>Checkout Venue</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VenueList;
