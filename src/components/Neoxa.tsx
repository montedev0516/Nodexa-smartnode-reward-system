import Image from "next/image";

export default function Neoxa() {
  return (
    <section className="py-5">
      <h2 className="text-[40px] font-family-sora font-semibold text-center pb-5">NEOXA</h2>
      {/* Content for Neoxa section */}
      <div className="flex flex-wrap gap-[18px] xl:flex-nowrap xl:justify-between">
        <div className="inline-block w-full p-[1px] bg-gradient-to-r from-[#1ec0ca] to-[#ec008c] rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Marketcap</h5>
            <h5 className="text-semibold text-[24px] text-[#B0B0B0]">$10,000,000</h5>
          </div>
        </div>
        <div className="inline-block w-full p-[1px] bg-gradient-to-r from-[#1ec0ca] to-[#ec008c] rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Price</h5>
            <h5 className="text-semibold text-[24px] text-[#B0B0B0]">$0.0016</h5>
          </div>
        </div>
        <div className="inline-block w-full p-[1px] bg-gradient-to-r from-[#1ec0ca] to-[#ec008c] rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Circulation Supply</h5>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-semibold text-[24px] text-[#B0B0B0]">5,352,000,000</h5>
              <Image src="/neoxa_button/neoxa-coin.svg" alt="Neoxa Coin" width={20} height={20} className="w-[22px] h-[22px]" />
            </div>
          </div>
        </div>
        <div className="inline-block w-full p-[1px] bg-gradient-to-r from-[#1ec0ca] to-[#ec008c] rounded-[20px]">
          <div className="flex flex-col items-center justify-center w-full h-[90px] bg-[#272E50] text-white px-4 py-2 rounded-[20px]">
            <h5 className="text-semibold text-[22px] text-white ">Total Supply</h5>
            <div className="flex justify-between items-center gap-2">
              <h5 className="text-semibold text-[24px] text-[#B0B0B0]">21,000,000,000</h5>
              <Image src="/neoxa_button/neoxa-coin.svg" alt="Neoxa Coin" width={20} height={20} className="w-[22px] h-[22px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 