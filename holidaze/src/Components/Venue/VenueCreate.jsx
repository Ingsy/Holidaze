import React from "react";
import { VenueForm } from "./VenueForm";
//import { useNavigate } from "react-router-dom";
import { useHolidaizApi } from "../../Auth/constants";
import styles from "../../Styles/Venue.module.css";

export const VenueCreate = ({ onCreateError }) => {
  //const navigate = useNavigate();
  const { venues } = useHolidaizApi();

  const onSave = (venue) => {
    venues
      .create(venue)
      .then((data) => {
        window.location.reload();
      }) //navigate(`/venue/${data.id}`))
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
