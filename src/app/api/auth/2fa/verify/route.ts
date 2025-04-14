
import { NextResponse } from 'next/server';
import * as OTPAuth from "otpauth";

export async function POST(req: Request) {
    try {
        const { email,secret, token } = await req.json();

        console.log("$secret", secret);
        console.log("$code", token);

        const totp = new OTPAuth.TOTP({
            issuer: "Nodexa",
            label: email,
            secret: secret
        });

        const verified = totp.validate({
            token: token,
            window: 1
        });
        

        console.log("$verified", verified);

        if (verified == null) {
            return NextResponse.json({ error: 'Invalid code' }, { status: 401 });
        }

        console.log("✅ Valid 2FA code");
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error verifying 2FA:', error);
        return NextResponse.json({ error: 'Failed to verify 2FA' }, { status: 500 });
    }
}

