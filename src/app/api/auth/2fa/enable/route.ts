import { NextResponse } from 'next/server';
import QRcode from 'qrcode';
import * as OTPAuth from "otpauth";
import prisma from '@/lib/prisma';

export async function POST(req: Request) {

    try {
        console.log("Enabling 2FA");
        const { email } = await req.json();
        
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Generate secret
        const Secret = new OTPAuth.TOTP({
            issuer: "Nodexa",
            label: email,
            algorithm: "SHA1",
            digits: 6,
            period: 30,
            secret: new OTPAuth.Secret()
          });
        console.log("secret", Secret.secret.base32);

        // Generate backup codes
        const backupCodes = Array.from({ length: 8 }, () => 
            Math.random().toString(36).substring(2, 8).toUpperCase()
        );

        // Generate QR code
        const qrcode = await QRcode.toDataURL(Secret.toString());

        return NextResponse.json({
            secret: Secret.secret.base32,
            backupCodes,
            qrCode: qrcode
        });
    } catch (error) {
        console.error('Error enabling 2FA:', error);
        return NextResponse.json(
            { error: 'Failed to enable 2FA' },
            { status: 500 }
        );
    }
};

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        console.log(email);
        
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email.trim()
            },
            select: {
                twoFactorEnabled: true
            }
        });

        console.log("user", user);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        console.log("user.twoFactorEnabled", user.twoFactorEnabled);

        return NextResponse.json({ is2FAEnabled: user.twoFactorEnabled });
    } catch (error) {
        console.error('Error checking 2FA status:', error);
        return NextResponse.json({ error: 'Failed to check 2FA status' }, { status: 500 });
    }
}
