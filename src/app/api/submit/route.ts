import getDb from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, photo, description, hobby } = await req.json();

  if (!name || !email || !photo || !description || !hobby) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const db = await getDb(); // Now getDb returns the Db instance
    const collection = db.collection('users'); // Access the 'users' collection
    const result = await collection.insertOne({
      name,
      email,
      photo,
      description,
      hobby,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: 'Data inserted successfully', result });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ message: 'Error inserting data', error: error.message }, { status: 500 });
  }
}
