"use client";

import { useState, useEffect } from "react";
import TimeRangeSelector from "@/components/TimeRangeSelector";
import PriceChart from "@/components/PriceChart";

interface PriceData {
  id: string;
  price: number;
  timestamp: string;
}

const Divider = () => (
  <div className="w-full pt-[10px]">
      <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full" />
  </div>
);

export default function NeoxaPriceChart() {

  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [timeRange, setTimeRange] = useState<string>("1H");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(0);
  // const chartRef = useRef<Chart | null>(null);
  // const xAxisLabelsRef = useRef<string[]>([]);

  console.log('current hour', new Date().getUTCHours());

  const handleRangeChange = (range: string) => {
    setTimeRange(range);
  };

  // Fetch price history data
  const fetchPriceHistory = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/auth/neoxa/price-history?timeRange=${timeRange}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch price history: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setPriceData(data);
      console.log('price data', data);
      console.log('price data length', data.length);
      
      // Set current price if we have data
      if (data.length > 0) {
        setCurrentPrice(data[data.length - 1].price);
      }

      console.log('current price', currentPrice);
    
      // No need to generate fixed labels anymore as we're using actual data timestamps
      // xAxisLabelsRef.current = generateFixedXAxisLabels();
    } catch (error) {
      console.error("Error fetching price history:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Save current price to database (called by a cron job)
  // const saveCurrentPrice = async () => {
  //   try {
  //     const response = await fetch("/api/auth/neoxa/save-price");
      
  //     if (!response.ok) {
  //       console.error("Failed to save current price");
  //     }
  //   } catch (error) {
  //     console.error("Error saving current price:", error);
  //   }
  // };

  // Fetch data when time range changes
  useEffect(() => {
    fetchPriceHistory();
  }, [timeRange]);

  // useEffect(() => {
  //   const interval = setInterval(fetchPriceHistory, 5 * 60 * 1000); // 5 minutes
  //   // return () => clearInterval(interval);
  // }, []);

  // Set up interval to save price data every 5 minutes
  // useEffect(() => {
  //   // Initial save
  //   saveCurrentPrice();
    
  //   // Set up interval
  //   const interval = setInterval(saveCurrentPrice, 5 * 60 * 1000); // 5 minutes
    
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="w-full h-full rounded-lg  flex flex-col">
        <div className="bg-[#121826] border border-[#2F3747] rounded-lg px-[42px] py-[32px]">
          <div className="flex justify-between">
            <h3 className="text-white text-xl font-semibold">NEOXA</h3>
            <h3 className="text-white text-xl font-semibold">${currentPrice?.toFixed(5)}USD</h3>
          </div>
          <Divider />
          {isLoading ? (
            <div className="w-full h-[400px] flex items-center justify-center">
              <p className="text-gray-400">Loading price data...</p>
            </div>
          ) : error ? (
            <div className="w-full h-[400px] flex items-center justify-center">
              <p className="text-red-400">Error: {error}</p>
            </div>
          ) : (
            <PriceChart timeRange={timeRange} priceData={priceData} />
          )}
          <TimeRangeSelector
              selectedRange={timeRange}
              onRangeChange={handleRangeChange}
              />
        </div>
    </div>
  );
} 