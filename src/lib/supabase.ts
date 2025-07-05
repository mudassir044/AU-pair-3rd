import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

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
