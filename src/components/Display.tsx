// import "@/app/globals.css";
import NeoxaPriceChart from "./NeoxaPriceChart";

export default function Display() {
  return (
    <div className="flex flex-col justify-center items-center pt-16 pb-15 sm:pt-20 md:pt-30">
      <div className='p-[1px] bg-gradient-to-r from-[#1ec0ca] to-[#ec008c] rounded-lg mb-8'>
        <div className='w-[380px] h-[750px] sm:w-[600px] sm:h-[750px] md:w-[750px] md:h-[750px] lg:w-[950px] lg:h-[750px] bg-[#080525] rounded-lg flex'>
          <NeoxaPriceChart />
        </div>
      </div>
    </div>
  );
}
