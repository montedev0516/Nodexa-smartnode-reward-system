import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    
    const { email, newEmail, password } = await request.json()
    // Get user with current email and password
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        email: true,
        password: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      )
    }

    // Check if new email is same as current email
    if (user.email === newEmail) {
      return NextResponse.json(
        { error: 'New email is same as current email' },
        { status: 400 }
      )
    }

    // Check if email is already taken
    const existingUser = await prisma.user.findUnique({
      where: { email: newEmail }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already taken' },
        { status: 400 }
      )
    }

    // Update email
    await prisma.user.update({
      where: { email: email },
      data: { email: newEmail }
    })

    console.log("@@##email updated successfully@@##");

    return NextResponse.json(
      { 
        data: { email: newEmail },
        message: 'Email updated successfully'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error updating email:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}