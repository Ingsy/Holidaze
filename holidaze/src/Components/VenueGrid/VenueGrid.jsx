import React from "react";
import { Link } from "react-router-dom";
import styles from "../../Styles/VenueGrid.module.scss";
import StarRating from "../StarRating/StarRating";
import ButtonsAndLinks from "../../Styles/ButtonsAndLinks.module.scss";

const placeholderImageUrl = "https://picsum.photos/200/300";

function VenueGrid({ venues, loading, error }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading venues</p>;
  }
  return (
    <div className={styles.container}>
      <div className="row">
        {venues.map((venue) => (
          <div key={venue.id} className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className={styles.venueCard} tabIndex="0">
              <h2 className={`${styles.venueName} text-center`}>
                {venue.name.length > 20
                  ? `${venue.name.substring(0, 20)}...`
                  : venue.name}
              </h2>
              {venue.media.length > 0 ? (
                <img
                  src={venue.media[0]}
                  alt={`Venue Media`}
                  className={styles.media}
                />
              ) : (
                <img
                  src={placeholderImageUrl}
                  alt={`No Media Available`}
                  className={styles.media}
                />
              )}
              <div className={`d-flex ${styles.venueInfo}`}>
                <p className={`flex-grow-1 ${styles.venuePrice}`}>
                  ${venue.price} night
                </p>
                <StarRating rating={venue.rating} />
              </div>
              {venue.location.city && venue.location.country ? (
                <p className={styles.venueLocation}>
                  {venue.location.country}, {venue.location.city}
                </p>
              ) : (
                <p className={styles.venueLocation}>Exciting Location</p>
              )}
              <p className={styles.venueMaxGuests}>
                Accommodates: {venue.maxGuests} guests
              </p>

              <div className="mt-4 text-center">
                <Link
                  to={`/venue/${venue.id}`}
                  className={ButtonsAndLinks.Link}
                  tabIndex="0"
                >
                  Checkout Venue
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VenueGrid;
