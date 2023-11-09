import React from "react";
import { VenueForm } from "./VenueForm";
import { useNavigate } from "react-router-dom";
import styles from "./Venue.module.css";
import { useHolidaizApi } from "../../Auth/constants";

export const VenueUpdate = ({ venueData, onVenueUpdateError, onClose }) => {
  const navigate = useNavigate();
  const { venues } = useHolidaizApi();
  const onSave = (venue) => {
    venues
      .update(venue.id, venue)
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
