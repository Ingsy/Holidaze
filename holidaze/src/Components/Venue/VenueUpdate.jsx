import React, { useState } from "react";
import { VenueForm } from "./VenueForm";
import { useNavigate, useParams } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import Alert from "../Alert";
import styles from "../../Styles/Venue.module.css";

export const VenueUpdate = ({ venueData, onVenueUpdateError, onClose }) => {
  const { id: venueId } = useParams(); // Access the 'id' parameter
  const navigate = useNavigate();
  const { venues } = useHolidaizApi();
  const [editVenue, setEditVenue] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const onSave = async (venue) => {
    setEditVenue(true);

    try {
      await venues.update(venue.id, venue);
      console.log("Venue updated successfully");
      setAlert({ message: "Venue updated successfully", type: "success" });

      setTimeout(() => {
        console.log("Navigating to", `/venue/${venueId}`);
        navigate(`/venue/${venueId}`);
      }, 4000);
    } catch (error) {
      console.log("Update venue error", error);
      if (onVenueUpdateError) onVenueUpdateError(error);

      setAlert({ message: "Failed to update venue", type: "error" });
    }
  };

  return (
    <div className={`${styles.detailsContainer} mx-auto`}>
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
      <VenueForm
        venueData={venueData}
        onSave={onSave}
        onClose={onClose}
        editVenue={editVenue}
      />
    </div>
  );
};
