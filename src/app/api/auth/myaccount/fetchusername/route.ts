import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
   try {
     const { userid } = await req.json();

     const user = await prisma.user.findUnique({
        where: { id: userid},
        select: {
            email: true
        }
     });

     if(!user) {
        console.log("user not found!");
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
     }

     console.log("@#username", user.email.split('@')[0]);
     
     return NextResponse.json({data: user.email.split('@')[0]}, {status: 200});

   } catch (error) {
    console.error("error", error);
    return NextResponse.json({ error: 'Failed to store 2FA' }, { status: 500 });
   } 
}