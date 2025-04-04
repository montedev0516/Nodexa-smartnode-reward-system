"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
interface NeoxaPriceData {
  marketCap: number;
  price: number;
  volume24h: number;
  circulationSupply: number;
  totalSupply: number;
}

export default function Neoxa() {
  const [neoxaPriceData, setNeoxaPriceData] = useState<NeoxaPriceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the neoxa price data from the database
  const fetchNeoxaPriceData = async function() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/neoxa', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      
      if (response.ok) {
        setNeoxaPriceData(data);
      } else {
        setError('Failed to fetch neoxa price data');
      }
    } catch (error) {
        setError('Error fetching neoxa price data:')
        console.error(error);
    } finally {
      setIsLoading(false);
    }

  }

  // Fetch the neoxa price data from CoinMarketCap
  const fetchNeoxaPriceDataFromCoinMarketCap = async function() {
    try {
      const response = await fetch('/api/auth/neoxa/coinmarketcap', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch neoxa price data: ${response.status} ${response.statusText}`);
      }

      const neoxaPriceData = await response.json();
      setNeoxaPriceData(neoxaPriceData);
      
      // Save the neoxa price data to the database
      const response1 = await fetch('/api/auth/neoxa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(neoxaPriceData),
      });

      if (!response1.ok) {
        console.warn(`Failed to save neoxa price data to the database: ${response1.status} ${response1.statusText}`);
        // Continue execution even if saving fails
      } else {
        console.log('Neoxa price data saved to the database');
      }

    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      
      // Try to fetch from database as fallback
      try {
        await fetchNeoxaPriceData();
      } catch (fallbackError) {
        console.error('Fallback fetch also failed:', fallbackError);
      }
    }
  }

  useEffect(() => {
    fetchNeoxaPriceData();

    const interval = setInterval(
      fetchNeoxaPriceDataFromCoinMarketCap,
      1000 * 60 * 1 // 1 minutes
    );

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 7,
      // maximumFractionDigits: 2,
    }).format(value);
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 7,
      // maximumFractionDigits: 2,
    }).format(value);
  }

  
  return (
    <section className="py-5">
      <h2 className="text-[40px] font-family-sora font-semibold text-center pb-5">NEOXA</h2>
      {/* Content for Neoxa section */}
      <div className="flex flex-wrap gap-[18px] xl:flex-nowrap xl:justify-between">
        <div className="inline-block w-full p-[1px] bg-gradient-to-r from-[#1ec0ca] to-[#ec008c] rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Marketcap</h5>
            <h5 className="text-semibold text-[24px] text-[#B0B0B0]">{neoxaPriceData? formatCurrency(neoxaPriceData.marketCap) : '$100.000.000'}</h5>
          </div>
        </div>
        <div className="inline-block w-full p-[1px] bg-gradient-to-r from-[#1ec0ca] to-[#ec008c] rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Price</h5>
            <h5 className="text-semibold text-[24px] text-[#B0B0B0]">{neoxaPriceData? formatCurrency(neoxaPriceData.price) : '$0.0016'}</h5>
          </div>
        </div>
        <div className="inline-block w-full p-[1px] bg-gradient-to-r from-[#1ec0ca] to-[#ec008c] rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Circulation Supply</h5>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-semibold text-[24px] text-[#B0B0B0]">{neoxaPriceData? formatNumber(neoxaPriceData.circulationSupply) : '5,352,000,000'}</h5>
              <Image src="/neoxa_button/neoxa-coin.svg" alt="Neoxa Coin" width={20} height={20} className="w-[22px] h-[22px]" />
            </div>
          </div>
        </div>
        <div className="inline-block w-full p-[1px] bg-gradient-to-r from-[#1ec0ca] to-[#ec008c] rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Total Supply</h5>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-semibold text-[24px] text-[#B0B0B0]">{neoxaPriceData? formatNumber(neoxaPriceData.totalSupply) : '21,000,000,000'}</h5>
              <Image src="/neoxa_button/neoxa-coin.svg" alt="Neoxa Coin" width={20} height={20} className="w-[22px] h-[22px]" />
            </div>
          </div>
        </div>
      </div>
      {/* {isLoading && <div className="text-center text-white">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>} */}
    </section>
  );
} 