import React from "react";
import VenueGrid from "../VenueGrid/VenueGrid";

function VenueList({ venues }) {
  return <VenueGrid venues={venues} />;
}

export default VenueList;
