'use client';

import { useState } from 'react';
<<<<<<< HEAD
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, LayoutDashboard, BookOpen, BrainCircuit, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import Notes from './Notes';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isNotePage = pathname.startsWith('/notes/');

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      <div className={`fixed inset-y-0 left-0 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 bg-slate-800 p-6 transition-transform duration-200 ease-in-out md:relative md:translate-x-0 flex flex-col`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-red-500">Ace AI</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-4 mb-8">
          <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-sm">Dashboard</span>
          </Link>
          
          {isNotePage && (
            <>
              <Link href={`${pathname}/flashcards`} className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <BrainCircuit className="h-5 w-5" />
                <span className="text-sm">Flashcards</span>
              </Link>
              <Link href={`${pathname}/quiz`} className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <GraduationCap className="h-5 w-5" />
                <span className="text-sm">Quiz</span>
              </Link>
            </>
          )}
        </nav>

        <div className="flex-1 overflow-y-auto">
          <Notes />
        </div>

        <div className="mt-auto pt-6 space-y-4">
          <button className="w-full py-2 px-4 rounded bg-slate-700 hover:bg-slate-600 text-sm">
            Sign In
          </button>
          <button className="w-full py-2 px-4 rounded bg-gradient-to-r from-red-500 to-blue-900 hover:from-red-600 hover:to-blue-950 text-sm">
            Upgrade to Premium
=======
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
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
          </button>
        </div>
      </div>

<<<<<<< HEAD
      <div className="flex-1">
        <div className="p-4 md:hidden">
          <button onClick={() => setIsSidebarOpen(true)} className="text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
=======
      {/* Main content */}
      <div className="flex-1 bg-slate-900">
        {children}
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
      </div>
    </div>
  );
} 