import React, { createContext, useContext, useState, useEffect } from "react";
import { headers } from "../utils/authFetch";

import { load, getToken } from "../utils/LocalStorage";

const AuthContext = createContext();

const token = load("token") || getToken();
console.log("Token (loaded from localStorage):", token);

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
        `https://api.noroff.dev/api/v1/holidaze/profiles`,
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

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
