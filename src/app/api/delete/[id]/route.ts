// // api/delete/route.ts
import { NextResponse } from 'next/server';
import getDb from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
 console.log(req);
 
 
  try {
    const db = await getDb();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true, message: 'User deleted successfully!' });
    } else {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Error deleting user', error: error.message }, { status: 500 });
  }
}
