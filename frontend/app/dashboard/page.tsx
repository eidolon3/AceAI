'use client';

import Notes from '../../components/Notes';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-6 text-white">Your Notes</h1>
        <Notes mainContent={true} />
      </div>
    </ProtectedRoute>
  );
} 