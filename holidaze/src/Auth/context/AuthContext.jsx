import React, { createContext, useContext, useState, useEffect } from "react";
import { headers } from "../utils/authFetch";

import { load, getToken } from "../utils/LocalStorage";
import { getUserName } from "../utils/LocalStorage";

const AuthContext = createContext();

const username = getUserName();

const token = load("token") || getToken();
console.log("Token (loaded from localStorage):", token);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${username}`,
        {
          headers: {
            ...headers(),
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching user data - API error:", errorData);
        throw Error(
          `User data retrieval failed with status ${response.status}`
        );
      }

      response
        .json()
        .then((userData) => {
          setUser((prevUser) => ({
            ...prevUser,
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
          }));
          console.log("User state after update:", user);
        })
        .catch((error) => {
          console.error("Error parsing user data:", error);
        });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateUserRole = (newUserRole) => {
    setUser((prevUser) => ({
      ...prevUser,
      venueManager: newUserRole,
    }));
  };

  return (
    <AuthContext.Provider value={{ user, token, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
