import React, { createContext, useContext, useState, useEffect } from "react";
import { headers } from "../utils/authFetch";

import { load, getToken } from "../utils/LocalStorage";

const AuthContext = createContext();

const token = load("token") || getToken();
console.log(token);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUserData(token).then((userData) => {
        setUser(userData);
      });
    }
  }, []);

  const fetchUserData = async (token, userName) => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${userName}`, // Replace with the correct profile name
        {
          headers: {
            ...headers(),
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (!response.ok) {
        console.error("Error fetching user data:", response.status);
        throw Error("User data retrieval failed.");
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
