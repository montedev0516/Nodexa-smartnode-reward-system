import { PrismaClient } from '@prisma/client';
import { sub, addMinutes } from "date-fns";

const prisma = new PrismaClient();

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
        timestamp: currentTime,
        price: parseFloat(currentPrice.toFixed(8))
      });
    }
    
    // Move to next 5-minute interval
    currentTime = addMinutes(currentTime, 5);
  }
  
  return data;
};

async function main() {
  console.log('Starting Bitcoin-like price data seed...');

  // Generate price data
  const priceHistoryEntries = generatePriceData();
  
  console.log(`Total entries to insert: ${priceHistoryEntries.length}`);
  
  // Insert all entries in batches to avoid memory issues
  const batchSize = 1000;
  for (let i = 0; i < priceHistoryEntries.length; i += batchSize) {
    const batch = priceHistoryEntries.slice(i, i + batchSize);
    await prisma.neoxaPriceHistory.createMany({
      data: batch,
    });
    console.log(`Inserted batch ${i / batchSize + 1} of ${Math.ceil(priceHistoryEntries.length / batchSize)}`);
  }
  
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 