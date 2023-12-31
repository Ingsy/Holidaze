/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from "react";
import { headers } from "../utils/authFetch";

import { load, getToken } from "../utils/LocalStorage";
import { getUserName } from "../utils/LocalStorage";

const AuthContext = createContext();

const username = getUserName();

const token = load("token") || getToken();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    token: load("token") || getToken(),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    } else {
      setIsLoading(false);
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
            venueManager: userData.venueManager,
          }));
        })
        .catch((error) => {
          console.error("Error parsing user data:", error);
        })
        .finally(() => setIsLoading(false));
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
    <AuthContext.Provider value={{ user, updateUserRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
