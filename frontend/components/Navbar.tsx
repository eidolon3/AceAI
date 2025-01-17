'use client';

import { useAuth } from '../lib/store';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          AceAI
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">
                Welcome, {user.name}
              </span>
              <button
                onClick={logout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-white hover:text-gray-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 