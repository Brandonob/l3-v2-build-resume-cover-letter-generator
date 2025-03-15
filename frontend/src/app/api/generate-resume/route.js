import { generateResume } from '../../../../lib/gemini';
import connectToDatabase from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Connect to MongoDB and wait for the connection
    const db = await connectToDatabase(); 
    if (!db) {
      throw new Error('Failed to connect to MongoDB');
    }
    // Get the req body
    const userData = await req.json();
    // Save user data
    await db.collection('users').insertOne(userData); 
    
    // Generate resume using Gemini AI
    const resumeContent = await generateResume(userData);

    return NextResponse.json({ content: resumeContent });
  } catch (error) {
    console.error('Error generating resume:', error);
    return NextResponse.json(
      { message: 'Failed to generate resume', error: error.message },
      { status: 500 }
    );
  }
}
