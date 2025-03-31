import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
        
    try {
        // Get token from URL query parameters
        const token = request.nextUrl.searchParams.get('token');

        console.log("token", token);
        
        if (!token) {
            return NextResponse.json(
                { error: 'No reset token provided' },
                { status: 400 }
            );
        }
    
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
        // await prisma.user.update({
        //     where: { id: user.id },
        //     data: {
        //         emailVerified: true,
        //         verifyToken: null,
        //         verifyTokenExpiry: null,
        //     },
        // });

        //Redirect to new password page with success message
        return NextResponse.redirect(new URL(`http://46.4.5.53:3000/new-password?token=${token}`, request.url));

    } catch (error) {
        console.error('Reset verification error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}