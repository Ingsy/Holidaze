import React from "react";
import VenueList from "../../Components/VenueList";

function Home() {
  return (
    <div>
      <div>Hello</div>
      <h2>Venues Near You</h2>
      <VenueList /> {/* Include the VenueList component here */}
    </div>
  );
}

export default Home;
