import { generateResume } from '../../lib/gemini';
import { getDB } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB
    const db = await getDB();

    if (!db) {
      console.error('Database connection failed');
      return res.status(500).json({ error: 'Database connection failed' });
    }

    // Save user data
    const userCollection = db.collection('users');
    const userData = req.body;
    await userCollection.insertOne(userData);

    // Generate resume using Gemini AI
    const resumeContent = await generateResume(userData);

    return res.status(200).json({ content: resumeContent });
  } catch (error) {
    console.error('Error generating resume:', error);
    return res
      .status(500)
      .json({ message: 'Failed to generate resume', error: error.message });
  }
}
