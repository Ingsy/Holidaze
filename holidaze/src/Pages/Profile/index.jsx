import React from "react";
import UserProfile from "./UserProfile/UserProfile";
import UpdateForm from "./Avatar/UpdateForm";
import ToggleVenueManager from "./ToggleVenueManager/Toggle";
import CreateVenue from "../../Components/CreateVenue";

function Profile() {
  return (
    <div>
      <UserProfile />
      <UpdateForm />
      <ToggleVenueManager />
      <CreateVenue />
    </div>
  );
}

export default Profile;
