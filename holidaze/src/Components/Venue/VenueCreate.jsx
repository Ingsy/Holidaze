import React from "react";
import { VenueForm } from "./VenueForm";
import { useNavigate } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import styles from "../../Styles/Venue.module.scss";

export const VenueCreate = ({ onCreateError }) => {
  const navigate = useNavigate();
  const { venues } = useHolidaizApi();

  const onSave = (venue) => {
    venues
      .create(venue)
      .then((data) => {
        console.log("Data from create venue:", data);
        console.log("Venue ID:", data.data.id);
        setTimeout(() => {
          navigate(`/venues/${data.data.id}`);
        }, 2000);
      })
      .catch((error) => {
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
