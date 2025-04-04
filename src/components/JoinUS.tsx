import Image from "next/image";
import Link from "next/link";
export default function JoinUs() {
  return (
    <section className="pt-16">
      <div className="flex justify-center items-center py-5 gap-3">
        <h2 className="text-[46px] font-family-poppins font-semibold text-center text-white">Join</h2>
        <h2 className="text-[46px] font-family-poppins font-semibold text-center text-[#00AEB9]">Us</h2>
      </div>
      <div className="flex justify-center py-5 px-5 space-x-8">
        <Link href="https://x.com/NodexaNet">
        <div className="inline-block w-[90px] h-[90px] p-[2px] bg-gradient-to-t from-[#1ec0ca] to-[#ec008c] rounded-full">
           <button className="w-full h-full flex justify-center items-center bg-[#272E50] rounded-full cursor-pointer">
             <Image src="/join_us/twitter.svg" alt="Twitter" width={20} height={20} className="w-[55px] h-[45px]"/>
           </button>
        </div>
        </Link>
        <Link href="https://discord.gg/2Bb47UhEer">
        <div className="inline-block w-[90px] h-[90px] p-[2px] bg-gradient-to-b from-[#1ec0ca] to-[#ec008c] rounded-full">
           <button className="w-full h-full flex justify-center items-center bg-[#272E50] rounded-full cursor-pointer">
               <Image src="/join_us/discord.svg" alt="Discord" width={20} height={20} className="w-[51px] h-[39px]"/>
           </button>
        </div>
        </Link>
      </div>
    </section>
  );
} 