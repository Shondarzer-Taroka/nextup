// // // src/lib/mongodb.ts
// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI || '';
// const options = {};

// let client;
// let clientPromise: Promise<MongoClient>;
// const dbName = 'yourDatabaseName'; // Specify your database name here

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your MongoDB URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable to preserve the MongoDB client
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, create a new MongoClient
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default async function getDb() {
//   const client = await clientPromise;
//   return client.db(dbName); // Access the database with the specified name
// }






// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI || '';
// const options = {};

// let client;
// let clientPromise: Promise<MongoClient>;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your MongoDB URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable to preserve the MongoDB client
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, create a new MongoClient
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;


import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the MongoDB client
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db('myDatabase'); // Pass your database name here
}
