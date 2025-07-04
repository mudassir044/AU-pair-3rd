
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Auth state management
interface User {
  id: string;
  email: string;
  name: string;
  role: 'au_pair' | 'host_family' | 'admin';
  profileComplete: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      login: (user: User) => {
        set({ user, isAuthenticated: true, isLoading: false });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, isLoading: false });
        // Clear localStorage
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-data');
      },
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const token = localStorage.getItem('auth-token');
          
          if (!token) {
            set({ user: null, isAuthenticated: false, isLoading: false });
            return;
          }

          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            set({ 
              user: userData.user, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            // Token is invalid
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user-data');
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Navigation state management
interface NavigationState {
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPath: '/',
  setCurrentPath: (path: string) => set({ currentPath: path }),
}));
