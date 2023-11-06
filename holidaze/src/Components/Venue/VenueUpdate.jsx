import React from "react";
import { VenueForm } from "./VenueForm";
import { updateVenue } from "./venueAPI";
import { useNavigate } from "react-router-dom";

import styles from "./Venue.module.css";

export const VenueUpdate = ({ venueData, onVenueUpdateError, onClose }) => {
  const navigate = useNavigate();
  const onSave = (venue) => {
    updateVenue(venue.id, venue)
      .then((data) => navigate(`/venue/${venue.id}`))
      .catch((error) => {
        console.log("Update venue error", error);
        if (onVenueUpdateError) onVenueUpdateError(error);
      });
  };
  return (
    <div className={`${styles.detailsContainer} mx-auto`}>
      <VenueForm venueData={venueData} onSave={onSave} onClose={onClose} />;
    </div>
  );
};
