import { NextResponse } from 'next/server';

// Mock data for development
const mockNotes = [
  {
    id: '1',
    title: 'YouTube Summary - 1/16/2025',
    content: '### Summary of the Interview with Trey Stevens...',
    createdAt: '2025-01-16',
  },
  // Add more mock notes as needed
];

export async function GET() {
  return NextResponse.json(mockNotes);
} 