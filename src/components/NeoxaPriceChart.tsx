"use client";

import { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
Chart.register(...registerables);

interface PriceData {
  id: string;
  price: number;
  timestamp: string;
}

type TimeRange = "10H" | "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "ALL";


export default function NeoxaPriceChart() {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("10H");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  // const chartRef = useRef<Chart | null>(null);
  // const xAxisLabelsRef = useRef<string[]>([]);

  console.log('current hour', new Date().getUTCHours());

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
  const saveCurrentPrice = async () => {
    try {
      const response = await fetch("/api/auth/neoxa/save-price");
      
      if (!response.ok) {
        console.error("Failed to save current price");
      }
    } catch (error) {
      console.error("Error saving current price:", error);
    }
  };

  // Fetch data when time range changes
  useEffect(() => {
    fetchPriceHistory();
  }, [timeRange]);

  // Set up interval to save price data every 5 minutes
  useEffect(() => {
    // Initial save
    saveCurrentPrice();
    
    // Set up interval
    const interval = setInterval(saveCurrentPrice, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  // Prepare chart data
  const chartData = {
    // Use actual timestamps for labels
    labels: priceData.map(item => {
      const date = new Date(item.timestamp);
      
      // Format labels differently based on time range
      if (timeRange === "10H") {
        // For 1H view, show time in 12-hour format with AM/PM
        return date.toLocaleTimeString([], { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        });
      } else {
        // For other time ranges, show date and time
        return date.toLocaleString([], { 
          month: 'short', 
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true 
        });
      }
    }),
    datasets: [
      {
        label: "NEOXA Price (USD)",
        data: priceData.map(item => item.price),
        borderColor: "rgb(30, 192, 202)", // Match the gradient color
        backgroundColor: "rgba(30, 192, 202, 0.1)",
        tension: 0.1,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  };

  // Calculate Y-axis min and max based on current price
  const getYAxisRange = () => {
    if (!currentPrice) return { min: 0, max: 1 };
    
    const step = 0.00005; // $0.00005 steps
    const range = step * 6; // 6 steps total
    
    return {
      min: currentPrice - range / 2,
      max: currentPrice + range / 2,
    };
  };

  const yAxisRange = getYAxisRange();

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: yAxisRange.min,
        max: yAxisRange.max,
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        border: {
          color: 'rgba(241, 224, 224, 0.9)',
        },
      },
      x: {
        grid: {
          display: true,
          drawOnChartArea: true, // Draw grid lines inside the chart area
          drawTicks: true, // Draw tick marks
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#ffffff',
          maxRotation: 0,
          minRotation: 0,
          // maxTicksLimit: 60,
          // minTicksLimit: 20,
        //   minRotation: 0,
          // Use a callback to format the labels
          callback: function(value: any, index: number) {
        //     // Get the actual timestamp from the data
            const date = new Date(priceData[index].timestamp);

            if (timeRange === "10H") {
              if(index % 4 === 0){
        //         // Format based on time range
                
                  return date.toLocaleTimeString([], {
                    month: '2-digit',
                    hour: 'numeric', 
                    minute: 'numeric',
                    hour12: false,
                    day: '2-digit',
                  });
              }
              return '';
            } else if(timeRange === "1D"){
              if(index % 2 === 0){
        //         // Format based on time range
                
                  return date.toLocaleTimeString([], {
                    month: '2-digit',
                    hour: 'numeric', 
                    minute: 'numeric',
                    hour12: false,
                    day: '2-digit',
                  });
              }
              return '';
            } else if(timeRange === "1W"){
              if(index % 8 === 0){
        //         // Format based on time range
                
                  return date.toLocaleTimeString([], {
                    month: '2-digit',
                    hour: 'numeric', 
                    minute: 'numeric',
                    hour12: false,
                    day: '2-digit',
                  });
              }
              return '';
            } else if(timeRange === "1M"){
              if(index % 4 === 0){
        //         // Format based on time range
                
                  return date.toLocaleTimeString([], {
                    month: '2-digit',
                    hour: 'numeric', 
                    minute: 'numeric',
                    hour12: false,
                    day: '2-digit',
                  });
              }
              return '';
            } else if(timeRange === "3M"){
              if(index % 16 === 0){
        //         // Format based on time range
                
                  return date.toLocaleTimeString([], {
                    month: '2-digit',
                    hour: 'numeric', 
                    minute: 'numeric',
                    hour12: false,
                    day: '2-digit',
                  });
              }
              return '';
            } else if(timeRange === "6M"){
              if(index % 8 === 0){
        //         // Format based on time range
                
                  return date.toLocaleTimeString([], {
                    month: '2-digit',
                    hour: 'numeric', 
                    minute: 'numeric',
                    hour12: false,
                    day: '2-digit',
                  });
              }
              return '';
            } else if(timeRange === "1Y"){
              if(index % 4 === 0){
        //         // Format based on time range
                
                  return date.toLocaleTimeString([], {
                    month: '2-digit',
                    hour: 'numeric', 
                    minute: 'numeric',
                    hour12: false,
                    day: '2-digit',
                  });
              }
              return '';
            }
            if (index === 0) {
              return date.toLocaleTimeString([], { 
                month: 'short',
                day: 'numeric',
                hour: 'numeric', 
                minute: 'numeric',
                hour12: true
              });
            }
            return '';
          }
        },
        border: {
          color: 'rgba(241, 224, 224, 0.9)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.parsed.y.toFixed(5)}`,
          title: (tooltipItems: any) => {
            const date = new Date(priceData[tooltipItems[0].dataIndex].timestamp);
            return date.toLocaleString();
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
  };

  return (
    <div className="w-full h-full bg-[#272E50] rounded-lg p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4 flex-row sm:flex-col gap-2 md:flex-row">
        <h3 className="text-white text-xl font-semibold">NEOXA Price Chart</h3>
        <div className="sm:flex space-x-2 hidden">
          {(["10H", "1D", "1W", "1M", "3M", "6M", "1Y", "ALL"] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2 py-1 rounded ${
                timeRange === range
                  ? "bg-[#0596A6] text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
        
      </div>
      
      <div className="flex-grow relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-white">Loading chart data...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-500">{error}</div>
          </div>
        ) : priceData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-white">No price data available</div>
          </div>
        ) : (<><Line data={chartData} options={options} /></>)
        // : (
          // <>
          //   <div className="absolute top-0 left-0 text-xs text-gray-400">
          //     Y-Axis: Price (USD)
          //   </div>
          //   <div className="absolute bottom-0 right-0 text-xs text-gray-400">
          //     X-Axis: Time
          //   </div>
          //   
          // </>
        // )
        }
      </div>
    </div>
  );
} 