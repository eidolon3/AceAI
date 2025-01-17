import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../lib/store';

export function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-8 h-8 rounded-full bg-slate-700"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{user.name}</p>
        <p className="text-xs text-slate-400 truncate">{user.email}</p>
      </div>
      <button
        onClick={logout}
        className="p-1 text-slate-400 hover:text-slate-100 transition-colors"
        title="Sign out"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}