import React, { useState, useEffect } from "react";
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
      setAlert({ message: "Venue updated successfully", type: "success" });

      setTimeout(() => {
        navigate(`/venue/${venueId}`);
      }, 4000);
    } catch (error) {
      if (onVenueUpdateError) onVenueUpdateError(error);

      setAlert({ message: "Failed to update venue", type: "error" });
    }
  };

  useEffect(() => {
    // Clear the alert after a certain time (e.g., 5000 milliseconds)
    const timeoutId = setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 5000);

    return () => {
      // Clear the timeout on component unmount or when alert changes
      clearTimeout(timeoutId);
    };
  }, [alert]);

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
