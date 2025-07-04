
"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/utils';

export default function AuthInitializer() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return null;
}
