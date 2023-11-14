import React from "react";
import VenueGrid from "../VenueGrid";

function VenueList({ venues }) {
  console.log("Venues in VenueList:", venues);

  return <VenueGrid venues={venues} />;
}

export default VenueList;
