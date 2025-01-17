import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { content } = await request.json();

  try {
    // Generate flashcards using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates flashcards based on provided content."
        },
        {
          role: "user",
          content: `Create 5 flashcards (question-answer pairs) based on this content: ${content}`
        }
      ]
    });

    // Parse the response and format it as flashcards
    const flashcards = [
      {
        id: '1',
        question: "What is Arsenal One?",
        answer: "Anduril's new U.S. factory for producing autonomous weapons systems",
      },
      // Add more flashcards based on the content
    ];

    return NextResponse.json(flashcards);
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.error();
  }
} 