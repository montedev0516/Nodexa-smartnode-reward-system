
import { Button } from "./button";

interface TimeRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

const ranges = ['1H', '1D', '1W', '1M', '3M', '6M', '1Y'];

const TimeRangeSelector = ({ selectedRange, onRangeChange }: TimeRangeSelectorProps) => {
  return (
    <div className="w-full flex justify-between gap-[1px] mb-4">
      {ranges.map((range) => (
        <Button
          key={range}
          variant={selectedRange === range ? "default" : "secondary"}
          size="sm"
          onClick={() => onRangeChange(range)}
          className={`transition-all w-full ${
            selectedRange === range 
              ? "bg-[#0596A6] hover:bg-[#0596A6]" 
              : "bg-[#272E50] hover:bg-[#2A3040] text-gray-300"
          }`}
        >
          {range}
        </Button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
