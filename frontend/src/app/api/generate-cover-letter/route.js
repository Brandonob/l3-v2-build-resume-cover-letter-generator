import { generateCoverLetter } from '../../../../lib/gemini';
import connectToDatabase from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const db = await connectToDatabase();

    if (!db) {
      throw new Error('Failed to connect to MongoDB');
    }

    const data = await req.json();
    await db.collection('users').insertOne(data);

    // Generate cover letter using Gemini AI
    const coverLetterContent = await generateCoverLetter(
      data,  // This now contains all user data including personalInfo
      data.jobTitle,
      data.companyName
    );

    return NextResponse.json({ content: coverLetterContent });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return NextResponse.json(
      { message: 'Failed to generate cover letter', error: error.message },
      { status: 500 }
    );
  }
}
