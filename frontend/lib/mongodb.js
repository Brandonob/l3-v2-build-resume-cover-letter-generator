import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI || !MONGODB_DB) {
  throw new Error('Please define the MONGODB_URI and MONGODB_DB environment variables');
}
console.log('>>>>>MONGODB_URI<<<<<', MONGODB_URI);
console.log('>>>>>MONGODB_DB<<<<<', MONGODB_DB);



async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(MONGODB_DB);

    return db;
  } catch (error) {
    console.error('MongoDB connection error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName
    });
    throw error;
  }
}

export default connectToDatabase;

// Use the same URI from your .env.local

// async function testConnection() {
//   try {
//     await MongoClient.connect(MONGODB_URI);
//     console.log('Connected successfully!');
//     await MongoClient.close();
//     console.log('Disconnected successfully!');
//   } catch (error) {
//     console.error('Connection test failed:', error);
//   }
// }

// testConnection();
