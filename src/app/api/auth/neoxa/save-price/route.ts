import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Fetch price from CoinMarketCap
        const params = new URLSearchParams({
            'symbol': 'NEOX',
            'convert': 'USD',
        });

        // Add a timeout to the fetch request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(
            `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?${params.toString()}`, {
            method: 'GET',
            headers: {
                'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY_CHARTS || '',
                'Accept': 'application/json',
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Failed to fetch neoxa price data from CoinMarketCap: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const price = data.data.NEOX.quote.USD.price;
        
        // Save the price to the history
        const priceHistory = await prisma.neoxaPriceHistory.create({
            data: {
                price,
            },
        });

        console.log('Neoxa price saved to the database', '$$$-here-$$$');
        
        return NextResponse.json(priceHistory, { status: 201 });
    } catch (error) {
        console.error('Error saving neoxa price:', error);
        
        // Check if it's a timeout error
        if (error instanceof Error && error.name === 'AbortError') {
            return NextResponse.json(
                { error: 'Request timed out. Please try again later.' },
                { status: 504 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to fetch and save price data. Please check your API key and network connection.' },
            { status: 500 }
        );
    }
} 