
// Generate sample price data for 1 year with 5-minute intervals
// This is a large dataset, but we'll use it to simulate real-world data

import { sub, addMinutes } from "date-fns";

// Generate realistic looking crypto price data
const generatePriceData = () => {
  const now = new Date();
  const oneYearAgo = sub(now, { years: 1 });
  
  // Start with a base price that's in the 0.00025 range
  let currentPrice = 0.00025 + (Math.random() * 0.00005); // Random starting price between 0.00025-0.0003
  
  const data = [];
  let currentTime = oneYearAgo;
  
  // Generate prices for each 5-minute interval for a year
  while (currentTime <= now) {
    // Add some randomness to price movements
    // More realistic price movements with occasional jumps and drops
    const randomFactor = Math.random() * 2 - 1; // Between -1 and 1
    const volatility = 0.007; // Base volatility
    
    // Add trend and seasonality factors
    const dayOfYear = currentTime.getDate() + currentTime.getMonth() * 30;
    const hourOfDay = currentTime.getHours();
    
    // Seasonal pattern (slightly higher in certain months)
    const seasonalFactor = Math.sin(dayOfYear / 30 * Math.PI) * 0.1;
    
    // Daily pattern (slightly higher during certain hours)
    const dailyFactor = Math.sin(hourOfDay / 24 * Math.PI * 2) * 0.05;
    
    // Calculate price change with all factors
    const change = currentPrice * volatility * randomFactor + 
                   currentPrice * 0.0001 * seasonalFactor + 
                   currentPrice * 0.01 * dailyFactor;
    
    // Add a chance for some data points to be missing (about 2% of points)
    const isDataMissing = Math.random() < 0.02;
    
    if (!isDataMissing) {
      currentPrice += change;
      
      // Ensure price stays within our desired range
      if (currentPrice < 0.00015) currentPrice = 0.00015 + (Math.random() * 0.00003);
      if (currentPrice > 0.00035) currentPrice = 0.00035 - (Math.random() * 0.00003);
      
      // Add some occasional significant moves (1% chance of a larger move)
      if (Math.random() < 0.01) {
        currentPrice *= (1 + (Math.random() * 0.1 - 0.05)); // -5% to +5% sudden move
        
        // Ensure we're still in range after larger moves
        if (currentPrice < 0.00015) currentPrice = 0.00015 + (Math.random() * 0.00002);
        if (currentPrice > 0.00035) currentPrice = 0.00035 - (Math.random() * 0.00002);
      }
      
      data.push({
        timestamp: currentTime.toISOString(),
        price: parseFloat(currentPrice.toFixed(8))
      });
    }
    
    // Move to next 5-minute interval
    currentTime = addMinutes(currentTime, 5);
  }
  
  return data;
};

export const priceData = generatePriceData();

// Helper function to get data for a specific time range
export const getDataForTimeRange = (range: string) => {
  const now = new Date();
  let startDate: Date;
  let interval: number; // in minutes
  
  // Set the start date and data point interval based on range
  switch (range) {
    case '1H':
      startDate = sub(now, { hours: 10 });
      interval = 5; // 5 minutes
      break;
    case '1D':
      startDate = sub(now, { days: 1 });
      interval = 5; // 5 minutes
      break;
    case '1W':
      startDate = sub(now, { weeks: 1 });
      interval = 15; // 15 minutes
      break;
    case '1M':
      startDate = sub(now, { months: 1 });
      interval = 60; // 1 hour
      break;
    case '3M':
      startDate = sub(now, { months: 3 });
      interval = 180; // 3 hours
      break;
    case '6M':
      startDate = sub(now, { months: 6 });
      interval = 360; // 6 hours
      break;
    case '1Y':
      startDate = sub(now, { years: 1 });
      interval = 720; // 12 hours
      break;
    default:
      startDate = sub(now, { days: 1 });
      interval = 5;
  }
  
  // Filter data for the selected time range
  const filteredData = priceData.filter(
    item => new Date(item.timestamp) >= startDate
  );
  
  // For longer timeframes, aggregate data to reduce points
  if (interval > 5) {
    const aggregatedData = [];
    for (let i = 0; i < filteredData.length; i += interval / 5) {
      if (filteredData[i]) {
        aggregatedData.push(filteredData[i]);
      }
    }
    return aggregatedData;
  }
  
  return filteredData;
};

// Helper to get the current price
export const getCurrentPrice = () => {
  if (priceData.length === 0) return 0;
  return priceData[priceData.length - 1].price;
};
