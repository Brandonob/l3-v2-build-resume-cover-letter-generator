import { generateResume } from '../../lib/gemini';
import { getDB } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB
    const db = await getDB();

    // Save user data
    const userData = req.body;
    const user = new User(userData);
    await user.save();

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
