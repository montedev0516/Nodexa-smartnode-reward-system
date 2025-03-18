import Image from "next/image"

export default function SharedNodesStatus() {
    return (
        <div className="flex flex-row justify-between items-center gap-[10px] px-[20px] xl:px-[40px] 2xl:px-[100px]">
            <div className="h-full p-[1px] bg-gradient-to-b from-[#1EC0CA] to-[#1EC0CA16] rounded-[32px]">
                <div className="h-full flex flex-col justify-between items-center bg-gradient-to-t from-[#0F0F0F] to-[#252525] rounded-[32px] px-[57px] py-[21px]">
                    <div className="font-family-sora font-semibold text-white text-[24px] text-center">Shared Nodes</div>
                    <div className="font-family-sora font-regular text-white text-[24px] text-center pb-[3px]">2/2</div>
                    <div className="flex flex-row justify-between items-center gap-[7px] border-[1px] border-[#26FF34] px-[15px] py-[7px] rounded-[7px]">
                        <div className="font-family-sora font-bold text-[16px] text-[#26FF34]">All Active</div>
                        <Image src="/dashboard/button_vector.svg" alt="button_vector" width={100} height={100} className="w-[16px] h-[16px]" />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-[16px] 2xl:gap-[32px]">
                <div className="h-full flex flex-col justify-between items-center gap-[6px]">
                    <div className="w-full p-[1px] bg-gradient-to-b from-[#1EC0CA] to-[#1EC0CA16] rounded-[32px]">
                        <div className="w-full h-full bg-gradient-to-t from-[#0F0F0F] to-[#252525] rounded-[32px] px-[60px] py-[11px]">
                            <div className="font-family-sora font-regular text-white text-[18px] text-center">My Shared Nodes</div>
                            <div className="font-family-sora font-semibold text-white text-[18px] text-center">02</div>
                        </div>
                    </div>
                    <div className="w-full p-[1px] bg-gradient-to-b from-[#1EC0CA] to-[#1EC0CA16] rounded-[32px]">
                        <div className="w-full h-full bg-gradient-to-t from-[#0F0F0F] to-[#252525] rounded-[32px] px-[52px] py-[11px]">
                            <div className="font-family-sora font-regular text-white text-[18px] text-center">My Total Earnings</div>
                            <div className="flex flex-row justify-center items-center gap-[10px]">
                                <div className="font-family-sora font-semibold text-white text-[18px] text-center">120,000</div>
                                <Image src="/neoxa_button/neoxa-coin.svg" alt="neoxa-coin" width={100} height={100} className="w-[19px] h-[19px]" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full flex flex-col justify-between items-center gap-[6px]">
                    <div className="w-full p-[1px] bg-gradient-to-b from-[#1EC0CA] to-[#1EC0CA16] rounded-[32px]">
                        <div className="w-full h-full bg-gradient-to-t from-[#0F0F0F] to-[#252525] rounded-[32px] px-[15px] py-[11px]">
                            <div className="font-family-sora font-regular text-white text-[18px] text-center">Collateral In Shared Nodes</div>
                            <div className="flex flex-row justify-center items-center gap-[10px]">
                                <div className="font-family-sora font-semibold text-white text-[18px] text-center">500,000</div>
                                <Image src="/neoxa_button/neoxa-coin.svg" alt="neoxa-coin" width={100} height={100} className="w-[19px] h-[19px]" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-[1px] bg-gradient-to-b from-[#1EC0CA] to-[#1EC0CA16] rounded-[32px]">
                        <div className="w-full h-full bg-gradient-to-t from-[#0F0F0F] to-[#252525] rounded-[32px] px-[42px] py-[11px]">
                            <div className="font-family-sora font-regular text-white text-[18px] text-center">Nodexa Smartnodes</div>
                            <div className="font-family-sora font-semibold text-white text-[18px] text-center">55</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
