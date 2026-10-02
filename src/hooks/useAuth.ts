'use client';

import { useUser, useClerk } from '@clerk/nextjs';

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

  return {
    user,
    loading: !isLoaded,
    isSignedIn: !!isSignedIn,
    signOut: () => signOut({ redirectUrl: '/' }),
  };
}
