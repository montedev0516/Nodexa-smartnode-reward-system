import { NextResponse } from "next/server";

export async function GET() {
    try {
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
                'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
                'Accept': 'application/json',
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Failed to fetch neoxa price data from CoinMarketCap: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const neoxaPriceData = {
            marketCap: data.data.NEOX.self_reported_market_cap,
            price: data.data.NEOX.quote.USD.price,
            volume24h: data.data.NEOX.quote.USD.volume_24h,
            circulationSupply: data.data.NEOX.self_reported_circulating_supply,
            totalSupply: data.data.NEOX.total_supply,
        }

        return NextResponse.json(neoxaPriceData);
    } catch (error) {
        console.error('Error fetching neoxa price data from CoinMarketCap:', error);
        
        // Check if it's a timeout error
        if (error instanceof Error && error.name === 'AbortError') {
            return NextResponse.json(
                { error: 'Request timed out. Please try again later.' },
                { status: 504 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to fetch price data. Please check your API key and network connection.' },
            { status: 500 }
        );
    }
} 