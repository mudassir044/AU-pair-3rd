"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthInitializer() {
  const { isAuthenticated, setUser } = useAuthStore();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('auth-storage');
    if (storedUser) {
      try {
        const parsedData = JSON.parse(storedUser);
        if (parsedData.state?.user) {
          setUser(parsedData.state.user);
        }
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
      }
    }
  }, [setUser]);

  return null;
}