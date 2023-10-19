import React from "react";
import VenueList from "../../Components/VenueList";

function Home() {
  return (
    <div>
      <h2 className="text-center">Venues</h2>
      <VenueList /> {/* Include the VenueList component here */}
    </div>
  );
}

export default Home;
