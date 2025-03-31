import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyRecaptcha } from "@/utils/recaptchaUtils";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const newPasswordSchema = z.object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    recaptchaToken: z.string().min(1),
    token: z.string().min(1),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = newPasswordSchema.parse(body);
        
        const { password, confirmPassword, recaptchaToken, token } = validatedData;

        // Verify passwords match
        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: 'Passwords do not match' },
                { status: 400 }
            );
        }

        const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
        if (!isRecaptchaValid) {
            return NextResponse.json(
                { error: 'Invalid reCAPTCHA verification' },
                { status: 400 }
            );
        }

        // Find user with valid reset token
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
                { error: 'Invalid or expired reset token' },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update user's password and clear reset token
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordTokenExpiry: null,
            },
        });

        return NextResponse.json({
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error('New password error:', error);
        
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
