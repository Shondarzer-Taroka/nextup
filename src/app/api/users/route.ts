// // app/api/users/route.ts

import getDb from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db=await getDb()
        const result=  await db.collection('users').find({}).toArray();
        return NextResponse.json(result)
    } catch (error) {
       return NextResponse.json({error:error})
    }
}