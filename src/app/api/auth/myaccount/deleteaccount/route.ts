import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        console.log("user", user);

        await prisma.user.delete({
            where: {
                email: email
            }
        });

        return NextResponse.json({ success: true }, { status: 200});

    } catch (error) {
        console.error('Error delete account:', error);
        return NextResponse.json({ error: 'Failed to delete account'}, { status: 500});
    }
}