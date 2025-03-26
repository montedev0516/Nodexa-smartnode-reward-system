import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Test the connection by running a simple query
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    
    return NextResponse.json({ 
      status: 'Connected',
      details: result,
      database: process.env.DATABASE_URL?.split('@')[1] // Show database location without credentials
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      status: 'Error',
      error: error instanceof Error ? error.message : 'Failed to connect to database',
      database: process.env.DATABASE_URL?.split('@')[1] // Show database location without credentials
    }, { status: 500 });
  }
} 