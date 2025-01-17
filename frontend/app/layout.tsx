<<<<<<< HEAD
'use client';

import { Providers } from './providers';
import Navbar from '../components/Navbar';
import './globals.css';
=======
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AceAI - Study Assistant',
  description: 'AI-powered study guide generator',
}
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c

export default function RootLayout({
  children,
}: {
<<<<<<< HEAD
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-gray-900">
        <Providers>
          <Navbar />
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
=======
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-slate-100`}>
        {children}
      </body>
    </html>
  )
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
}
