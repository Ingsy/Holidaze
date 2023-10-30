import React from "react";
import UserProfile from "./UserProfile/UserProfile";
import UpdateAvatar from "./Avatar/index";
import CreateVenue from "../../Components/CreateVenue";
import ProfileVenues from "./ProfileVenues";

function Profile() {
  return (
    <div>
      <UserProfile />
      <UpdateAvatar />
      <CreateVenue />
      <ProfileVenues />
    </div>
  );
}

export default Profile;
