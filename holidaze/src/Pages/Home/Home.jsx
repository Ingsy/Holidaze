import React from "react";
import VenueList from "../../Components/Venue/VenueList";

function Home({ filterVenue, searchResults }) {
  const venuesToShow = searchResults.length > 0 ? searchResults : filterVenue;

  return (
    <div className="text-center m-2">
      <h1>Venues</h1>
      <VenueList venues={venuesToShow} />
    </div>
  );
}

export default Home;
