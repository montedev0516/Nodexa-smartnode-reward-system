import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { secret, email, backupCodes } = await req.json();
        console.log("secret", secret);
        console.log("email", email);
        console.log("backupCodes", backupCodes);

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        console.log("user", user);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
       
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                twoFactorEnabled: true,
                twoFactorSecret: secret,
                backUpCodes: backupCodes.join(',')
            }
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error storing 2FA:', error);
        return NextResponse.json({ error: 'Failed to store 2FA' }, { status: 500 });
    }
} 