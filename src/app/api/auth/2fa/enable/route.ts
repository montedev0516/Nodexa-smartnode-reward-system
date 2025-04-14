import { NextResponse } from 'next/server';
import QRcode from 'qrcode';
import * as OTPAuth from "otpauth";

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
}