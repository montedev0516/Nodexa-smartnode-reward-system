import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
interface NeoxaPriceData {
    marketCap: number;
    price: number;
    circulationSupply: number;
    totalSupply: number;
}

export async function GET(request: Request) {
    try {
        console.log('Fetching neoxa price data from the database', "$$$$$HHHH");
        // Fetch the latest price data from the database
        const latestPriceData = await prisma.neoxaPriceData.findFirst({
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!latestPriceData) {
            return NextResponse.json(
                { error: 'No price data found' }, 
                { status: 404 });
        }
    
        const neoxaPriceData: NeoxaPriceData = {
            marketCap: latestPriceData.marketCap,
            price: latestPriceData.price,
            circulationSupply: latestPriceData.circulationSupply,
            totalSupply: latestPriceData.totalSupply,
        }
        return NextResponse.json(neoxaPriceData);
    } catch (error) {
        console.error('Error fetching neoxa price data:', error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 });
    }
}

// export async function POST(request: Request) {
//     try {
//         const { marketCap, price, volume24h, circulationSupply, totalSupply } = await request.json();
        
//         // Create a new neoxa price data record
//         const neoxaPriceData = await prisma.neoxaPriceData.create({
//             data: {
//                 marketCap,
//                 price,
//                 volume24h,
//                 circulationSupply,
//                 totalSupply,
//             },
//         });

//         return NextResponse.json(neoxaPriceData, 
//             { status: 201 });
//     } catch (error) {
//         console.error('Error saving neoxa price data:', error);
//         return NextResponse.json(
//             { error: 'Internal server error' },
//             { status: 500 }
//         );
//     }
// }
