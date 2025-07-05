import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

// Create client with fallback values
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl !== "https://placeholder.supabase.co" &&
    supabaseAnonKey !== "placeholder-key" &&
    supabaseUrl.includes("supabase.co")
  );
};

// Database types based on your Supabase schema
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name?: string;
          role: "au_pair" | "host_family" | "admin";
          profile_complete: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string;
          role: "au_pair" | "host_family" | "admin";
          profile_complete?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: "au_pair" | "host_family" | "admin";
          profile_complete?: boolean;
          updated_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          type: "ID" | "PASSPORT" | "VISA" | "PROFILE_PHOTO";
          file_name: string;
          file_path: string;
          status: "PENDING" | "VERIFIED" | "REJECTED";
          uploaded_at: string;
          verified_at?: string;
          verified_by?: string;
          notes?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: "ID" | "PASSPORT" | "VISA" | "PROFILE_PHOTO";
          file_name: string;
          file_path: string;
          status?: "PENDING" | "VERIFIED" | "REJECTED";
          uploaded_at?: string;
          verified_at?: string;
          verified_by?: string;
          notes?: string;
        };
        Update: {
          status?: "PENDING" | "VERIFIED" | "REJECTED";
          verified_at?: string;
          verified_by?: string;
          notes?: string;
        };
      };
    };
  };
}
