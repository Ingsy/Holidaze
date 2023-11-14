import React from "react";
import VenueList from "../../Components/Venue/VenueList";

function Home({ filterVenue, searchResults }) {
  console.log("Filter Venue in Home:", filterVenue);
  console.log("Search Results in Home:", searchResults);
  const venuesToShow = searchResults.length > 0 ? searchResults : filterVenue;
  console.log("Venues to Show in Home:", venuesToShow);

  return (
    <div className="text-center m-2">
      <h1>Venues</h1>
      <VenueList venues={venuesToShow} />
    </div>
  );
}

export default Home;
