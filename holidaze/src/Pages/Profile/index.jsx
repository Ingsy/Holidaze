import React from "react";
import UserProfile from "./UserProfile/UserProfile";
import UpdateForm from "./Avatar/UpdateForm";
import ToggleVenueManager from "./ToggleVenueManager/Toggle";
import CreateVenue from "../../Components/CreateVenue";
import ProfileVenues from "./ProfileVenues";

function Profile() {
  return (
    <div>
      <UserProfile />
      <UpdateForm />
      <ToggleVenueManager />
      <CreateVenue />
      <ProfileVenues />
    </div>
  );
}

export default Profile;
