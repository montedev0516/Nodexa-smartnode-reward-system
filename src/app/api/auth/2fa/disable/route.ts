import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        // Update user to disable 2FA
        await prisma.user.update({
            where: { email: email },
            data: {
                twoFactorSecret: null,
                twoFactorEnabled: false,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error disabling 2FA:', error);
        return NextResponse.json(
            { error: 'Failed to disable 2FA' },
            { status: 500 }
        );
    }
} 