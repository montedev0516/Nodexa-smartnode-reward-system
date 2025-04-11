import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const timeRange = searchParams.get('timeRange') || '1H';
        
        // Calculate the start time based on the time range
        const now = new Date();
        let startTime = new Date();

        now.setUTCFullYear;
        now.setUTCMonth;
        now.setUTCDate;
        now.setUTCHours;
        now.setUTCMinutes;
        now.setUTCSeconds;
        let unit = 1;
        
        switch (timeRange) {
            case '1H':
                startTime.setHours(now.getHours() - 10);
                console.log('1H view', startTime); // 10 hours for 1H view
                break;
            case '1D':
                startTime.setDate(now.getDate() - 1);
                break;
            case '1W':
                startTime.setDate(now.getDate() - 7);
                unit = 3;
                break;
            case '1M':
                startTime.setMonth(now.getMonth() - 1);
                unit = 12;
                break;
            case '3M':
                startTime.setMonth(now.getMonth() - 3);
                unit = 36;
                break;
            case '6M':
                startTime.setMonth(now.getMonth() - 6);
                unit = 72;
                break;
            case '1Y':
                startTime.setFullYear(now.getFullYear() - 1);
                unit = 144;
                break;
            case 'ALL':
                // For ALL, we'll just get all records
                startTime = new Date(0); // Beginning of time
                unit = 144;
                break;
            default:
                startTime.setHours(now.getHours() - 10); // Default to 10 hours
        }

        console.log("starttime--->", startTime)
        console.log("endtime--->", now)

        // Fetch price history from the database
        const priceHistory = await prisma.neoxaPriceHistory.findMany({
            where: {
                timestamp: {
                    gte: startTime,
                    lte: now,
                },
            },
            orderBy: {
                timestamp: 'asc',
            },
        });
        if(unit == 1) return NextResponse.json(priceHistory);
        else {
            let responsePriceHistoryWithFilter = priceHistory.filter((element, index) => index % unit === 0);
            return NextResponse.json(responsePriceHistoryWithFilter);
        }

    } catch (error) {
        console.error('Error fetching neoxa price history:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { price } = await request.json();
        
        // Save the price to the history
        const priceHistory = await prisma.neoxaPriceHistory.create({
            data: {
                price,
            },
        });
        
        return NextResponse.json(priceHistory, { status: 201 });
    } catch (error) {
        console.error('Error saving neoxa price history:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 