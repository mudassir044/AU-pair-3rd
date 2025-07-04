
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to emit auth state changes
export function emitAuthStateChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent("authStateChanged"));
  }
}

// Helper function to check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  
  return !!(user && token);
}
