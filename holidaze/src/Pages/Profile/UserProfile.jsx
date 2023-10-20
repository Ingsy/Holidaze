import React from "react";
import { useAuth } from "../../Auth/context/AuthContext"; // Import useAuth

function UserProfile() {
  const { user } = useAuth(); // Access user data using useAuth

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.venueManager ? "Venue Manager" : "Regular User"}</p>
          <img src={user.avatar} alt="User Avatar" />
          {/* Add more user profile details here */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;
