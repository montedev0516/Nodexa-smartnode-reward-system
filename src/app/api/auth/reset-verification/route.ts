import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: { token: string }}
) {
    const { token }= params ?? {};
    try {
    
        //Find User with this verification token
        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordTokenExpiry: {
                    gt: new Date(), // Check if token hasn't expired
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid or expired verification link' },
                { status: 400}
            );
        }

        //Update user as Verified 
        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                verifyToken: null,
                verifyTokenExpiry: null,
            },
        });

        //Redirect to login page with success message
        return NextResponse.redirect(new URL(`http://46.4.5.53:3000/new-password?token=${token}`, request.url));

    } catch (error) {
        console.error('Email verification error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}