import React, { useState } from "react";
import { VenueForm } from "./VenueForm";
import { useNavigate } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import styles from "../../Styles/Venue.module.css";

export const VenueUpdate = ({ venueData, onVenueUpdateError, onClose }) => {
  const navigate = useNavigate();
  const { venues } = useHolidaizApi();
  const [editVenue, setEditVenue] = useState(false);

  const onSave = (venue) => {
    setEditVenue(true);
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
      <VenueForm
        venueData={venueData}
        onSave={onSave}
        onClose={onClose}
        editVenue={editVenue}
      />
      ;
    </div>
  );
};
