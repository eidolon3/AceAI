'use client';

import { useState } from 'react';
import { LayoutDashboard, Settings, Crown, LogIn } from 'lucide-react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Temporary state

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-slate-950 text-slate-100 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-900">
            Ace AI
          </h1>
        </div>

        <nav className="space-y-1">
          <Link 
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-slate-800/50"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <button 
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-slate-800/50"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="mt-auto space-y-4">
          {!isAuthenticated && (
            <button
              className="w-full px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800/50 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
          
          <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-blue-900 hover:from-red-600 hover:to-blue-950 transition-colors">
            <div className="flex items-center justify-center gap-2">
              <Crown className="w-4 h-4" />
              <span>Upgrade to Premium</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-slate-900">
        {children}
      </div>
    </div>
  );
} 