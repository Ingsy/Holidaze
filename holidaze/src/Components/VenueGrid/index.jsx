import React from "react";
import { Link } from "react-router-dom";
import styles from "./VenueGrid.module.css";
import StarRating from "../StarRating";
import ButtonsAndLinks from "../../Styles/ButtonsAndLinks.module.scss";

const placeholderImageUrl = "https://picsum.photos/200/300";

function VenueGrid({ venues, loading }) {
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
                <p className={styles.venuePrice}>${venue.price} night</p>
                {venue.location.city && venue.location.country && (
                  <p className={styles.venueLocation}>
                    {venue.location.country}, {venue.location.city}
                  </p>
                )}
                <p className={styles.venueMaxGuests}>
                  Max Guests: {venue.maxGuests}
                </p>
                <StarRating rating={venue.rating} />

                <Link
                  to={`/venue/${venue.id}`}
                  className={ButtonsAndLinks.Link}
                >
                  Checkout Venue
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VenueGrid;
