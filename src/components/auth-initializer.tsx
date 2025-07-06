"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer() {
  const { initialize, initialized, setUser, setToken, isAuthenticated } =
    useAuthStore();

  useEffect(() => {
    if (!initialized) {
      initialize();

      // Check for existing auth data in localStorage
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth-token");
        const storedUserData = localStorage.getItem("auth-storage");

        if (token && storedUserData && !isAuthenticated) {
          try {
            const parsedData = JSON.parse(storedUserData);
            if (parsedData.state?.user && parsedData.state?.isAuthenticated) {
              setUser(parsedData.state.user);
              setToken(token);
              console.log("Auth state restored:", parsedData.state.user);
            }
          } catch (error) {
            console.error("Error parsing stored auth data:", error);
            // Clear corrupted data
            localStorage.removeItem("auth-token");
            localStorage.removeItem("auth-storage");
          }
        }
      }
    }
  }, [initialize, initialized, setUser, setToken, isAuthenticated]);

  return null;
}
