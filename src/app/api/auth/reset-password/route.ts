
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { z } from 'zod';
import { verifyRecaptcha } from '@/utils/recaptchaUtils';
import { sendVerificationEmail } from '@/utils/email';

const resetPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
    recaptchaToken: z.string().min(1, 'reCAPTCHA verification is required'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate request body
        const validatedData = resetPasswordSchema.parse(body);

        // Verify reCAPTCHA
        const isRecaptchaValid = await verifyRecaptcha(validatedData.recaptchaToken);
        if (!isRecaptchaValid) {
            return NextResponse.json(
                { error: 'Invalid reCAPTCHA verification' },
                { status: 400 }
            );
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Generate reset password token
        const resetToken = crypto.randomUUID();
        const resetPasswordTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Save reset token to database
        await prisma.user.update({
            where: { id: user.id },
            data: { 
                resetPasswordToken: resetToken, 
                resetPasswordTokenExpiry: resetPasswordTokenExpiry 
            },
        });

        // Send reset password email    
        const resetUrl = `${process.env.NODEXA_PUBLIC_APP_URL}/api/auth/reset-verification?${resetToken}`;
        await sendVerificationEmail(user.email, resetUrl);

        return NextResponse.json(
            { message: 'Reset password email sent' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json(
            { error: 'Failed to reset password' },
            { status: 500 }
        );
    }
}
