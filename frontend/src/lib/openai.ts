import OpenAI from 'openai';
import { getVideoInfo } from './youtube';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Mock responses for development and fallback
const mockResponses = {
  flashcards: [
    { question: "What is a flashcard?", answer: "A learning tool with a question on one side and answer on the other" },
    { question: "How do flashcards help learning?", answer: "They use active recall to strengthen memory" }
  ],
  questions: [
    {
      question: "What is the purpose of studying?",
      options: ["To pass time", "To gain knowledge", "To avoid work", "To meet people"],
      correctAnswer: 1
    }
  ]
};

// Initialize OpenAI client if API key is available
const openai = apiKey ? new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true // Note: In production, calls should go through your backend
}) : null;

async function generateStudyGuide(content: string, type?: 'youtube' | 'pdf' | 'text') {
  if (!openai) {
    throw new Error('OpenAI API key not found. Please add your API key to the .env file.');
  }

  try {
    let processedContent = content;
    
    if (type === 'youtube') {
      const videoInfo = await getVideoInfo(content);
      processedContent = videoInfo.transcript;
    }

    const prompt = `Create a comprehensive study guide for this content. The study guide should be detailed enough for someone to learn the material thoroughly. Be specific. Reference specific things from the video. Do NOT be vague. No dilly dallying. Information Dense. Follow these STRICT formatting rules:

1. Main Title and Overview:
   - Use a single # for the main title
   - Follow with a brief 2-3 sentence overview
   - Leave one blank line before and after

2. Section Headers:
   - Use ## for all section headers
   - Leave one blank line before and after each section
   - Keep section titles clear and descriptive

3. Content Organization:
   - Break dense text into 2-3 sentence paragraphs
   - Use consistent bullet point indentation
   - Start each bullet with a hyphen (-)
   - Indent sub-bullets with two spaces
   - Bold key terms using **term**

Content to create study guide from: ${processedContent}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert educator specializing in creating comprehensive study guides. Focus on clarity, organization, and helping students understand complex topics. Include examples and practice elements where appropriate."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2500
    });

    const studyGuide = response.choices[0]?.message?.content;
    if (!studyGuide) {
      throw new Error('Failed to generate study guide');
    }

    return studyGuide;
  } catch (error) {
    console.error('Failed to generate study guide:', error);
    throw error;
  }
}

export async function generateSummary(content: string, type?: 'youtube' | 'pdf' | 'text') {
  // First generate the study guide
  const studyGuide = await generateStudyGuide(content, type);

  // Then create a concise summary of the study guide
  if (!openai) {
    throw new Error('OpenAI API key not found. Please add your API key to the .env file.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "Create a concise summary of this study guide while maintaining its key points and structure. Keep the markdown formatting."
        },
        {
          role: "user",
          content: studyGuide
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    const summary = response.choices[0]?.message?.content;
    if (!summary) {
      throw new Error('Failed to generate summary');
    }

    return studyGuide; // Return the full study guide instead of the summary
  } catch (error) {
    console.error('Failed to generate summary:', error);
    throw error;
  }
}

export async function generateFlashcards(studyGuide: string) {
  if (!openai) {
    throw new Error('OpenAI API key not found. Please add your API key to the .env file.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are creating flashcards directly from a study guide. Each flashcard must be based on SPECIFIC content from the guide.

Rules:
1. NEVER create generic questions like "What is X?" or "Define Y"
2. Instead, use the exact context and examples from the guide
3. Questions should include specific details, numbers, or examples mentioned
4. Front of card should provide enough context to answer
5. Back of card should quote or closely paraphrase the guide

Example formats:
- "According to the section on X, what were the three main factors that..."
- "In the example about Y, what specific technique was used to..."
- "The study guide mentions X technique for Y. What were the specific steps..."

Return a JSON object with a 'flashcards' array containing objects with 'question' and 'answer' fields.

Remember: Every single flashcard must reference specific content from the study guide. No generic questions allowed.`
        },
        {
          role: "user",
          content: studyGuide
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const result = JSON.parse(response.choices[0]?.message?.content || '{}');
    if (!result.flashcards || !Array.isArray(result.flashcards)) {
      console.warn('Invalid flashcards response, using mock data');
      return mockResponses.flashcards;
    }

    return result.flashcards;
  } catch (error) {
    console.error('Failed to generate flashcards:', error);
    return mockResponses.flashcards;
  }
}

export async function generateQuiz(studyGuide: string) {
  if (!openai) {
    throw new Error('OpenAI API key not found. Please add your API key to the .env file.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are creating a multiple-choice quiz directly from a study guide. Each question must be based on SPECIFIC content from the guide.

Rules:
1. Questions MUST quote or closely paraphrase specific parts of the guide
2. Include the section or context where the information comes from
3. Use exact examples, numbers, and terminology from the guide
4. Wrong answers should be based on related content from the guide
5. Questions should test different cognitive levels:
   - Recall of specific facts and examples
   - Understanding of relationships between concepts
   - Application of principles to new situations
   - Analysis of complex ideas presented

Example formats:
- "In the section on X, the guide describes Y as having which three characteristics..."
- "According to the example about X, what specific outcome resulted when..."
- "The study guide presents X technique for Y. Which of these steps matches the guide's description..."

Return a JSON object with a 'questions' array containing objects with 'question', 'options' (array), and 'correctAnswer' (index) fields.

Remember: Every single question must reference specific content from the study guide. No generic questions allowed.`
        },
        {
          role: "user",
          content: studyGuide
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const result = JSON.parse(response.choices[0]?.message?.content || '{}');
    if (!result.questions || !Array.isArray(result.questions)) {
      console.warn('Invalid quiz response, using mock data');
      return mockResponses.questions;
    }

    return result.questions;
  } catch (error) {
    console.error('Failed to generate quiz:', error);
    return mockResponses.questions;
  }
}

export async function chatWithAI(messages: { role: 'user' | 'assistant'; content: string }[]) {
  if (!openai) {
    throw new Error('OpenAI API key not found. Please add your API key to the .env file.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert study assistant with deep knowledge of academic subjects. Help students understand complex topics by providing clear, accurate explanations with examples and analogies when appropriate."
        },
        ...messages
      ],
      temperature: 0.5
    });

    const reply = response.choices[0]?.message?.content;
    if (!reply) {
      throw new Error('Failed to generate response');
    }

    return reply;
  } catch (error) {
    console.error('Failed to chat with AI:', error);
    throw error;
  }
}