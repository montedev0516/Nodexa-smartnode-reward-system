import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface NeoxaPriceData {
    marketCap: number;
    price: number;
    circulationSupply: number;
    totalSupply: number;
}

export async function GET() {
    try {
        
        const data = await prisma.neoxaPriceData.findFirst({
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!data) {
            return NextResponse.json(
                { error: 'No price data found' }, 
                { status: 404 });
        }

        if (data) {
            const neoxaPriceData: NeoxaPriceData = {
                marketCap: data.marketCap,
                price: data.price,
                circulationSupply: data.circulationSupply,
                totalSupply: data.totalSupply
            }
            return NextResponse.json(neoxaPriceData);
        }

    } catch (error) {
        console.error('Error fetching neoxa price data from Database:', error);
        
        return NextResponse.json(
            { error: 'Failed to fetch price data. Please check your database and network connection.' },
            { status: 500 }
        );
    }
} 