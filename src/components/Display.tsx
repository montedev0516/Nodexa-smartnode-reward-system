// import "@/app/globals.css";
import NeoxaPriceChart from "./NeoxaPriceChart";

export default function Display() {
  return (
    <div className="flex flex-col justify-center items-center pt-16 pb-15 sm:pt-20 md:pt-30">
      <div className='border-[#404768] border-1 rounded-lg mb-8'>
        <div className='w-[380px] sm:w-[600px] md:w-[750px] lg:w-[950px] bg-[#080525] rounded-lg flex'>
          <NeoxaPriceChart />
        </div>
      </div>
    </div>
  );
}
