import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: "au_pair" | "host_family" | "admin";
  profile_complete: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    userData: Partial<User>,
  ) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      initialized: false,

      initialize: async () => {
        try {
          set({ isLoading: true });

          // Get current session
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession();

          if (error) {
            console.error("Error getting session:", error);
            set({ isLoading: false, initialized: true });
            return;
          }

          if (session?.user) {
            // Get user profile from database
            const { data: userProfile, error: profileError } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (profileError) {
              console.error("Error fetching user profile:", profileError);
              set({ isLoading: false, initialized: true });
              return;
            }

            if (userProfile) {
              set({
                user: {
                  id: userProfile.id,
                  email: userProfile.email,
                  full_name: userProfile.full_name,
                  role: userProfile.role,
                  profile_complete: userProfile.profile_complete,
                },
                isAuthenticated: true,
                isLoading: false,
                initialized: true,
              });
            }
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              initialized: true,
            });
          }

          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "SIGNED_IN" && session?.user) {
              // Fetch user profile
              const { data: userProfile } = await supabase
                .from("users")
                .select("*")
                .eq("id", session.user.id)
                .single();

              if (userProfile) {
                set({
                  user: {
                    id: userProfile.id,
                    email: userProfile.email,
                    full_name: userProfile.full_name,
                    role: userProfile.role,
                    profile_complete: userProfile.profile_complete,
                  },
                  isAuthenticated: true,
                  isLoading: false,
                });
              }
            } else if (event === "SIGNED_OUT") {
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
              });
            }
          });
        } catch (error) {
          console.error("Error initializing auth:", error);
          set({ isLoading: false, initialized: true });
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            // Fetch user profile
            const { data: userProfile, error: profileError } = await supabase
              .from("users")
              .select("*")
              .eq("id", data.user.id)
              .single();

            if (profileError) throw profileError;

            if (userProfile) {
              set({
                user: {
                  id: userProfile.id,
                  email: userProfile.email,
                  full_name: userProfile.full_name,
                  role: userProfile.role,
                  profile_complete: userProfile.profile_complete,
                },
                isAuthenticated: true,
                isLoading: false,
              });
            }
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (
        email: string,
        password: string,
        userData: Partial<User>,
      ) => {
        set({ isLoading: true });
        try {
          // Sign up with Supabase Auth
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            // Create user profile in database
            const { error: profileError } = await supabase
              .from("users")
              .insert({
                id: data.user.id,
                email: data.user.email!,
                full_name: userData.full_name,
                role: userData.role!,
                profile_complete: false,
              });

            if (profileError) throw profileError;

            set({
              user: {
                id: data.user.id,
                email: data.user.email!,
                full_name: userData.full_name,
                role: userData.role!,
                profile_complete: false,
              },
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;

          set({
            user: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error("Error signing out:", error);
          // Force logout locally even if remote logout fails
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      updateProfile: async (updates: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) throw new Error("No user logged in");

        try {
          const { error } = await supabase
            .from("users")
            .update({
              full_name: updates.full_name,
              profile_complete: updates.profile_complete,
              updated_at: new Date().toISOString(),
            })
            .eq("id", currentUser.id);

          if (error) throw error;

          // Update local state
          set({
            user: {
              ...currentUser,
              ...updates,
            },
          });
        } catch (error) {
          console.error("Error updating profile:", error);
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
