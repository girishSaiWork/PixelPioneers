'use client';

import { useAuth, SignInButton, SignOutButton } from '@clerk/nextjs';
import { Button } from './ui/button';

export default function AuthButton() {
  const { isSignedIn } = useAuth();

  return (
    <div className="absolute top-4 right-4">
      {isSignedIn ? (
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      ) : (
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}