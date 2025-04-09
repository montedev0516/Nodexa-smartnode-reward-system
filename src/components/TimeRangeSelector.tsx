
import { Button } from "./button";

interface TimeRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

const ranges = ['10H', '1D', '1W', '1M', '3M', '6M', '1Y'];

const TimeRangeSelector = ({ selectedRange, onRangeChange }: TimeRangeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {ranges.map((range) => (
        <Button
          key={range}
          variant={selectedRange === range ? "default" : "secondary"}
          size="sm"
          onClick={() => onRangeChange(range)}
          className={`transition-all rounded-md ${
            selectedRange === range 
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-[#1A1F2C] hover:bg-[#2A3040] text-gray-300"
          }`}
        >
          {range}
        </Button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
