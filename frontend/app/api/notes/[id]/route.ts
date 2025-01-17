import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const note = {
    id: params.id,
    title: 'YouTube Summary - 1/16/2025',
    content: '### Summary of the Interview with Trey Stevens...',
    createdAt: '2025-01-16',
  };

  return NextResponse.json(note);
} 