import { generateCoverLetter } from '../../lib/gemini';
import { getDB } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const db = await getDB();

    if (!db) {
      console.error('Database connection failed');
      return res.status(500).json({ error: 'Database connection failed' });
    }

    const userCollection = db.collection('users');
    const userData = req.body;
    await userCollection.insertOne(userData);

    const { jobTitle, companyName } = req.body;

    // Generate cover letter using Gemini AI
    const coverLetterContent = await generateCoverLetter(
      userData,
      jobTitle,
      companyName
    );

    return res.status(200).json({ content: coverLetterContent });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return res.status(500).json({
      message: 'Failed to generate cover letter',
      error: error.message,
    });
  }
}
