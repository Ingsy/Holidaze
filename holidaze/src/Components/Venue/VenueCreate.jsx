import React from "react";
import { VenueForm } from "./VenueForm";
import { createVenue } from "./venueAPI";
import { useNavigate } from "react-router-dom";

import styles from "./Venue.module.css";

export const VenueCreate = ({ onCreateError }) => {
  const navigate = useNavigate();
  const onSave = (venue) => {
    createVenue(venue)
      .then((data) => navigate(`/venue/${data.id}`))
      .catch((error) => {
        console.log("Create venue error", error);
        if (onCreateError) onCreateError(error);
      });
  };
  const onClose = () => {
    alert("Cancel create venue");
  };
  return (
    <div className={`${styles.detailsContainer} mx-auto`}>
      <VenueForm onSave={onSave} onClose={onClose} />;
    </div>
  );
};
