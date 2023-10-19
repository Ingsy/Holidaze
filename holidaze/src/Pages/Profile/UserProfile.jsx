import React, { useEffect, useState } from "react";
import { ProfileBaseUrl } from "../../Auth/constants";
import { headers } from "../../Auth/utils/authFetch";

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch the user's profile data
    fetch(ProfileBaseUrl, { headers: headers() })
      .then((response) => response.json())
      .then((data) => {
        console.log("User Profile Data:", data);
        setUserProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  return (
    <div>
      {userProfile ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          <p>
            Role: {userProfile.venueManager ? "Venue Manager" : "Regular User"}
          </p>
          <img src={userProfile.avatar} alt="User Avatar" />
          {/* Add more user profile details here */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;
