import { useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";

interface PriceData {
  id?: string;
  price: number;
  timestamp: string;
}

interface PriceChartProps {
  timeRange: string;
  priceData?: PriceData[];
}

const PriceChart = ({ timeRange, priceData = [] }: PriceChartProps) => {
  // Use provided price data or fallback to empty array
  const data = useMemo(() => priceData, [priceData]);

  let maxPrice = data[0].price;
  let minPrice = data[0].price;
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].price);
    if (data[i].price > maxPrice) {
      maxPrice = data[i].price;
    }
    if (data[i].price < minPrice) {
      minPrice = data[i].price;
    }
  }


  // Calculate current price (last price in the array)
  const currentPrice = useMemo(() => {
    if (data.length === 0) return 0.00025;
    return data[data.length - 1].price;
  }, [data]);

  // Calculate min and max for Y axis - fixed range of 0.0003 with current price in middle
  const yAxisRange = (maxPrice - minPrice) * 1.5;

  const priceMin = useMemo(() => {
    // Set min to half the range below current price
    return minPrice - ((maxPrice - minPrice) / 4);
  }, [maxPrice, minPrice]);

  const priceMax = useMemo(() => {
    // Set min to half the range below current price
    return maxPrice + ((maxPrice - minPrice) / 4);
  }, [maxPrice, minPrice]);

  // Calculate tick values for Y axis
  const yAxisTicks = useMemo(() => {
    const range = priceMax - priceMin;
    const tickCount = 5;
    const tickStep = range / (tickCount - 1);
    return Array.from({ length: tickCount }, (_, i) =>
      Number((priceMin + (tickStep * i)).toFixed(8))
    );
  }, [priceMin, priceMax]);

  // Determine the time format for X axis based on the selected range
  const getTimeFormat = () => {
    switch (timeRange) {
      case '1H':
        return 'h:mm a'; // Hours:minutes AM/PM
      case '1D':
        return 'h:mm a'; // Hours:minutes AM/PM
      case '1W':
        return 'MMM dd'; // Month day
      case '1M':
        return 'MMM dd'; // Month day
      case '3M':
        return 'MMM dd'; // Month day
      case '6M':
        return 'MMM yyyy'; // Month year
      case '1Y':
        return 'MMM yyyy'; // Month year
      default:
        return 'h:mm a';
    }
  };

  // Determine the tick interval for X axis based on the selected range
  const getTickInterval = () => {
    const length = data.length;
    if (length === 0) return 0;

    switch (timeRange) {
      case '1H':
        return Math.floor(length / 5); // ~5 ticks (every 2 hours)
      case '1D':
        return Math.floor(length / 6); // ~6 ticks (every 4 hours)
      case '1W':
        return Math.floor(length / 7); // ~7 ticks (every day)
      case '1M':
        return Math.floor(length / 7); // ~7 ticks (every 4-5 days)
      case '3M':
        return Math.floor(length / 6); // ~6 ticks (every 15 days)
      case '6M':
        return Math.floor(length / 6); // ~6 ticks (every month)
      case '1Y':
        return Math.floor(length / 6); // ~6 ticks (every 2 months)
      default:
        return Math.floor(length / 6);
    }
  };

  // Format the tooltip
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#080525] p-4 rounded-md shadow-lg border border-gray-700 text-white">
          <p className="font-medium text-white">
            {format(parseISO(data.timestamp), 'MMM d, h:mm a')}
          </p>
          <p className="text-[#4FE4B8] font-bold">
            Price: ${data.price.toFixed(8)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format price labels for Y axis
  const formatYAxis = (value: number) => {
    return `$${value.toFixed(6)}`;
  };

  // Determine if price is up from start of period
  const isPriceUp = useMemo(() => {
    if (data.length < 2) return true;
    return data[data.length - 1].price >= data[0].price;
  }, [data]);

  const chartColor = isPriceUp ? "#4FE4B8" : "#FF5A87";

  // Find current point for reference line (if in view)
  const currentTimestamp = new Date().toISOString();
  const isCurrentInView = data.length > 0;

  // Empty state when no data is available
  if (data.length === 0) {
    return (
      <div className="w-full h-[400px] bg-[#080525] rounded-lg p-4 flex items-center justify-center">
        <p className="text-gray-400">No price data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] bg-[#080525] rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={chartColor}
                stopOpacity={0.3}
              />
              <stop
                offset="100%"
                stopColor={chartColor}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => format(parseISO(timestamp), getTimeFormat())}
            tick={{ fontSize: 12, fill: "#8B94A3" }}
            interval={getTickInterval()}
            axisLine={{ stroke: "#2F3747" }}
            tickLine={{ stroke: "#2F3747" }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            domain={[priceMin, priceMax]}
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12, fill: "#8B94A3" }}
            axisLine={{ stroke: "#2F3747" }}
            tickLine={{ stroke: "#2F3747" }}
            orientation="right"
            padding={{ top: 0, bottom: 0 }}
            ticks={yAxisTicks}
            tickCount={5}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#2F3747" opacity={0.3} />
          <Tooltip content={<CustomTooltip />} />
          {isCurrentInView && (
            <ReferenceLine
              x={currentTimestamp}
              stroke="#8B94A3"
              strokeDasharray="3 3"
              strokeWidth={1}
            />
          )}
          
          <Area
            type="monotone"
            dataKey="price"
            stroke={chartColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
            isAnimationActive={true}
            animationDuration={500}
            dot={false}
            activeDot={{ r: 5, fill: chartColor, stroke: "#121826", strokeWidth: 2 }}
          />
          <ReferenceLine
            y={data[0].price}
            stroke="#8B94A3"
            strokeDasharray="3 3"
            strokeWidth={1}
          >
            <Label
              value={`$${data[0].price.toFixed(8)}`}
              position={{ x: 115, y: 4 }}
              offset={10}
              fill="#ffffff"
              fontSize={16}
            />
          </ReferenceLine>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
