import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/email';

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, message } = await req.json();

        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        console.log("email", email, "firstName", firstName, "lastName", lastName, "message", message);

        // Send email
        await sendEmail({
            To: 'montecristodev2025@gmail.com',
            Subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            Html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending contact form:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
} 