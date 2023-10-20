import React from "react";
import { removeToken } from "../utils/LocalStorage";

function LogoutButton() {
  const handleLogout = () => {
    console.log("Logout button clicked");
    removeToken();

    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
