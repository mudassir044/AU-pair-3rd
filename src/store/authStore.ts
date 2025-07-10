import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  full_name?: string;
  name?: string;
  firstName?: string;
  role: "au_pair" | "host_family" | "admin";
  profileComplete: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
      initialized: false,

      initialize: () => {
        if (typeof window !== "undefined") {
          // Get stored auth data from Zustand persist
          const storedState = localStorage.getItem("auth-storage");

          if (storedState) {
            try {
              const parsedState = JSON.parse(storedState);
              if (
                parsedState.state?.user &&
                parsedState.state?.isAuthenticated &&
                parsedState.state?.token
              ) {
                // Validate token is not null/undefined/empty
                const token = parsedState.state.token;
                if (
                  token &&
                  token !== "null" &&
                  token !== "undefined" &&
                  token.trim() !== ""
                ) {
                  set({
                    user: parsedState.state.user,
                    token: token,
                    isAuthenticated: true,
                    initialized: true,
                  });

                  // Ensure localStorage sync
                  localStorage.setItem("auth-token", token);
                  return;
                }
              }
            } catch (error) {
              console.error("Error restoring auth state:", error);
              // Clear corrupted data
              localStorage.removeItem("auth-storage");
              localStorage.removeItem("auth-token");
            }
          }
        }
        set({ initialized: true });
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "https://au-pair.onrender.com";
          const response = await fetch(`${apiUrl}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Invalid email or password");
          }

          const data = await response.json();

          // Validate token exists and is valid
          if (
            !data.token ||
            data.token === "null" ||
            data.token === "undefined"
          ) {
            throw new Error("Invalid token received from server");
          }

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });

          // Store token in localStorage for API calls
          if (typeof window !== "undefined") {
            localStorage.setItem("auth-token", data.token);
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData: any) => {
        set({ isLoading: true });
        try {
          console.log("Registering user with data:", userData);
          const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "https://au-pair.onrender.com";
          const response = await fetch(`${apiUrl}/api/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Registration failed:", errorData);
            throw new Error(errorData.message || "Registration failed");
          }

          const data = await response.json();
          console.log("Registration successful:", data);

          // Validate token exists and is valid
          if (
            !data.token ||
            data.token === "null" ||
            data.token === "undefined"
          ) {
            throw new Error("Invalid token received from server");
          }

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });

          // Store token in localStorage for API calls
          if (typeof window !== "undefined") {
            localStorage.setItem("auth-token", data.token);
          }

          console.log(
            "Auth state updated after registration with token:",
            data.token?.substring(0, 20) + "...",
          );
        } catch (error) {
          console.error("Registration error:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          const token =
            typeof window !== "undefined"
              ? localStorage.getItem("auth-token")
              : null;
          if (token && token !== "null" && token !== "undefined") {
            const apiUrl =
              process.env.NEXT_PUBLIC_API_URL || "https://au-pair.onrender.com";
            await fetch(`${apiUrl}/api/auth/logout`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
          }
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth-token");
            localStorage.removeItem("auth-storage");
          }
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      setToken: (token: string) => {
        set({ token });
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-token", token);
        }
      },

      clearAuth: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-token");
          localStorage.removeItem("auth-storage");
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      skipHydration: true,
    },
  ),
);
