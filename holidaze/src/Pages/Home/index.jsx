import React from "react";
import VenueList from "../../Components/Venue/VenueList";

function Home({ filterVenue }) {
  return (
    <div className="text-center m-2">
      <h1>Venues</h1>
      <VenueList venues={filterVenue} />
    </div>
  );
}

export default Home;
