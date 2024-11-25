
// import getDb from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';
// import { NextResponse } from 'next/server';

import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// export async function PUT(req: Request) {
//   try {
//     // Parse the incoming request body
//     const { _id, name, email, photo, description, hobby } = await req.json();
//     // Validate required fields
//     if (!_id || !name || !email) {
//       return NextResponse.json({ message: 'ID, Name, and Email are required.' }, { status: 400 });
//     }
//     // Connect to the database
//     const db = await getDb();
//     const usersCollection = db.collection('users');
//     // Update the user
//     const result = await usersCollection.updateOne(
//       { _id: new ObjectId(_id) }, // Find user by ID
//       {
//         $set: {
//           name,
//           email,
//           photo,
//           description,
//           hobby,
//           updatedAt: new Date(), // Add a timestamp for the update
//         },
//       }
//     );
//     // Check if the update was successful
//     if (result.matchedCount === 0) {
//       return NextResponse.json({ message: 'User not found.' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'User updated successfully.',
//     });
//   } catch (error) {
//     const err= error as Error
//     console.error('Error updating user:', error);
//     return NextResponse.json(
//       { message: 'Internal server error', error: err.message },
//       { status: 500 }
//     );
//   }
// }


export async function PUT(req:Request) {

    try {
        const {_id,email,name,photo,description,hobby}=await req.json()
        if (!_id || !email || !name) {
            return NextResponse.json({message:'id,name,email is required'})
        }
        const db=await getDb()
        const usersCollection=db.collection('users')
       const result= usersCollection.updateOne({_id:new ObjectId(_id)},{
            $set:{
                name,
                email,
                description,
                hobby,
                photo,
                updatedAt: new Date(),
            }
        })

        if ((await result).modifiedCount===0) {
            return NextResponse.json({message:'user not found'},{status:400})
        }else{
            return NextResponse.json({message:'successfully updated',success:true},{status:200})
        }

    } catch (error) {
        const err=error as Error
        return NextResponse.json({message:'internal server erro'},{status:500})
    }
    
}
