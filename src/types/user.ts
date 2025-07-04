
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  full_name?: string;
  displayName?: string;
  profilePicture?: string;
  role: 'au_pair' | 'host_family' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Type guard for safe access
export function getUserDisplayName(user: User | null): string {
  if (!user) return 'Guest';
  return user.displayName || user.full_name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'User';
}

// Type guard for checking if user exists
export function isValidUser(user: any): user is User {
  return user && typeof user === 'object' && typeof user.id === 'string' && typeof user.email === 'string';
}
