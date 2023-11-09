import React from "react";
import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import styles from "../../Styles/VenueGrid.module.css";

const placeholderImageUrl = "https://picsum.photos/200/300"; // The original image size

function VenueGrid({ venues, loading }) {
  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="col d-flex justify-content-center align-items-center"
            >
              <div className={styles.YourVenueCard} tabIndex="0">
                <h2 className={`${styles.venueName} text-center`}>
                  {venue.name.length > 30
                    ? `${venue.name.substring(0, 30)}...`
                    : venue.name}
                </h2>
                {venue.media.length > 0 ? (
                  <img
                    src={venue.media[0]}
                    alt={`Venue Media`}
                    className={styles.YourMedia}
                  />
                ) : (
                  <img
                    src={placeholderImageUrl}
                    alt={`No Media Available`}
                    className={styles.YourMedia}
                    width="150"
                    height="200"
                  />
                )}
                <div className={`d-flex ${styles.venueInfo}`}>
                  <p className={`flex-grow-1 ${styles.YourVenuePrice}`}>
                    ${venue.price} night
                  </p>
                  <StarRating rating={venue.rating} />
                </div>
                {venue.location.city && venue.location.country ? (
                  <p className={styles.YourVenueLocation}>
                    {venue.location.country}, {venue.location.city}
                  </p>
                ) : (
                  <p className={styles.YourVenueLocation}>Exciting Location</p>
                )}

                <div className="mt-auto text-center">
                  <Link
                    to={`/venue/${venue.id}`}
                    className={styles.Link}
                    tabIndex="0"
                  >
                    Checkout Venue
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VenueGrid;
