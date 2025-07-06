"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer() {
  const { initialize, initialized, setUser, setToken } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      initialize();

      // Check for existing auth data in localStorage
      const token = localStorage.getItem("auth-token");
      const storedUser = localStorage.getItem("auth-storage");

      if (token && storedUser) {
        try {
          const parsedData = JSON.parse(storedUser);
          if (parsedData.state?.user) {
            setUser(parsedData.state.user);
            setToken(token);
          }
        } catch (error) {
          console.error("Error parsing stored auth data:", error);
        }
      }
    }
  }, [initialize, initialized, setUser, setToken]);

  return null;
}
