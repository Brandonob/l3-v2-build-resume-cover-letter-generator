import { MongoClient } from 'mongodb';

const { MONGODB_DB, MONGODB_URI } = process.env;

if (!MONGODB_URI || !MONGODB_DB) {
  throw new Error('MONGO URI OR DB Not Found!');
}

console.log('>>>>>>>MONGO DB URI<<<<<<<<', MONGODB_URI);
console.log('>>>>>>>MONGO DB DB<<<<<<<<', MONGODB_DB);

export async function connectToDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);

    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

export async function getDB() {
  try {
    const client = await connectToDB();

    return client.db(MONGODB_DB);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable');
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectToDatabase() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectToDatabase;
