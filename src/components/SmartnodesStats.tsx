import Image from "next/image";

export default function SmartnodesStats() {
  return (
    <section className="py-5">
      <h2 className="text-[40px] font-family-sora font-semibold text-center pt-16 pb-3">SMARTNODES STATS</h2>
      {/* Content for Neoxa section */}
      <div className="flex flex-wrap gap-[18px] pt-3 pb-3 xl:flex-nowrap xl:justify-between text-center">
        <div className="inline-block w-full p-[2px] linearGradient rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[20px] leading-[24px] text-white">Daily Smartnode Rewards</h5>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-semibold text-[24px] text-[#B0B0B0]">$3,5 / 1,100</h5>
              <Image src="/neoxa_button/neoxa-coin.svg" alt="Neoxa Coin" width={20} height={20} className="w-[22px] h-[22px]" />
            </div>
          </div>
        </div>
        <div className="inline-block w-full p-[2px] linearGradient rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[19px] leading-[24px] text-white ">Monthly Smartnode Rewards</h5>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-semibold text-[24px] text-[#B0B0B0]">$85 / 30,500</h5>
              <Image src="/neoxa_button/neoxa-coin.svg" alt="Neoxa Coin" width={20} height={20} className="w-[22px] h-[22px]" />
            </div>
          </div>
        </div>
        <div className="inline-block w-full p-[2px] linearGradient rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Annual ROI</h5>
            <h5 className="text-semibold text-[24px] text-[#B0B0B0]">35.5%</h5>
          </div>
        </div>
        <div className="inline-block w-full p-[2px] linearGradient rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Smartnode Value</h5>
            <h5 className="text-semibold text-[24px] text-[#B0B0B0]">$1,650</h5>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-[18px] pt-3 pb-5 xl:flex-nowrap xl:justify-between text-center">
        <div className="inline-block w-full p-[2px] linearGradient rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Active Smartnodes</h5>
            <h5 className="text-semibold text-[24px] text-[#B0B0B0]">3250</h5>
          </div>
        </div>
        <div className="inline-block w-full p-[2px] linearGradient rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Total Smartnodes</h5>
            <h5 className="text-semibold text-[24px] text-[#B0B0B0]">3300</h5>
          </div>
        </div>
        <div className="inline-block w-full p-[2px] linearGradient rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[18px] leading-[24px] text-white pt-[5px]">Circulating Supply In Smartnodes</h5>
            <h5 className="text-semibold text-[24px] pt-[4px] text-[#B0B0B0]">65%</h5>
          </div>
        </div>
        <div className="inline-block w-full p-[2px] linearGradient rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Smartnode Collateral</h5>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-semibold text-[24px] text-[#B0B0B0]">1,000,000</h5> 
              <Image src="/neoxa_button/neoxa-coin.svg" alt="Neoxa Coin" width={20} height={20} className="w-[22px] h-[22px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 