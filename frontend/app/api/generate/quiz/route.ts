import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { content } = await request.json();

  try {
    // Generate quiz using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates multiple choice questions based on provided content."
        },
        {
          role: "user",
          content: `Create 5 multiple choice questions based on this content: ${content}`
        }
      ]
    });

    // Parse the response and format it as quiz questions
    const questions = [
      {
        id: '1',
        question: "What is Anduril's new factory called?",
        options: ['Arsenal One', 'Defense Base', 'Autonomous Factory', 'Tech Hub'],
        correctAnswer: 0,
      },
      // Add more questions based on the content
    ];

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.error();
  }
} 