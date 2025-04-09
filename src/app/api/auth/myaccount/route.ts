import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
    try {
        // Try to get session from NextAuth
        const session = await getServerSession(authOptions);
        
        // If NextAuth session exists, use it
        if (session?.user?.id) {
            console.log("Using NextAuth session:", session.user.id);
            
            const user = await prisma.user.findUnique({
                where: { id: session.user.id },
                select: {
                    email: true,
                }
            });

            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            return NextResponse.json({ email: user.email });
        }
        
        // Try custom auth token
        const cookieStore = await cookies();
        const authToken = cookieStore.get('auth-token')?.value;
        
        if (authToken) {
            try {
                // Verify the JWT token
                const secret = process.env.JWT_SECRET || 'your-secret-key';
                const decoded = jwt.verify(authToken, secret) as { userId: string; email: string };
                
                console.log("Using custom auth token for user:", decoded.userId);
                
                const user = await prisma.user.findUnique({
                    where: { id: decoded.userId },
                    select: {
                        email: true,
                    }
                });
                
                if (!user) {
                    return NextResponse.json({ error: "User not found" }, { status: 404 });
                }
                
                return NextResponse.json({ email: user.email });
            } catch (error) {
                console.error("JWT verification error:", error);
                return NextResponse.json({ error: "Invalid authentication token" }, { status: 401 });
            }
        }
        
        // If we get here, no valid authentication was found
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Server error", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

// Schema for updating user data
const updateUserSchema = z.object({
    email: z.string().email().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8).optional(),
});

export async function PUT(request: NextRequest) {
    // Try to get session from NextAuth
    const session = await getServerSession(authOptions);
    let userId = session?.user?.id;
    
    // If no NextAuth session, try custom auth token
    if (!userId) {
        const cookieStore = await cookies();
        const authToken = cookieStore.get('auth-token')?.value;
        
        if (authToken) {
            try {
                // Verify the JWT token
                const secret = process.env.JWT_SECRET || 'your-secret-key';
                const decoded = jwt.verify(authToken, secret) as { userId: string; email: string };
                userId = decoded.userId;
            } catch (error) {
                console.error("JWT verification error:", error);
                return NextResponse.json({ error: "Invalid authentication token" }, { status: 401 });
            }
        }
    }
    
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const validatedData = updateUserSchema.parse(body);
        
        // Get the current user
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                password: true,
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Prepare update data
        const updateData: { email?: string; password?: string } = {};

        // Handle email update
        if (validatedData.email && validatedData.email !== user.email) {
            updateData.email = validatedData.email;
        }

        // Handle password update
        if (validatedData.newPassword) {
            // Verify current password
            if (!validatedData.currentPassword) {
                return NextResponse.json({ error: "Current password is required to change password" }, { status: 400 });
            }

            const isPasswordValid = await bcrypt.compare(validatedData.currentPassword, user.password);
            if (!isPasswordValid) {
                return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10);
            updateData.password = hashedPassword;
        }

        // If no changes, return early
        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ message: "No changes to update" });
        }

        // Update user
        await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        return NextResponse.json({ message: "Account updated successfully" });
    } catch (error) {
        console.error("Error updating user data:", error);
        return NextResponse.json({ error: "Server error", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
