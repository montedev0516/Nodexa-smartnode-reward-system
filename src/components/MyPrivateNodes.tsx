import Image from "next/image"

export default function MyPrivateNodes() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-[40px] pt-[120px] pb-[200px]">
            <div className="w-full h-[56px] flex flex-row justify-between items-center px-[40px] py-[15px]">
                <div className="w-[70px] flex flex-row justify-start items-center">
                    <h1 className="font-family-sora font-semibold text-white text-[18px]">Name</h1>
                </div>
                <div className="w-[100px] flex flex-row justify-start items-center">
                    <h1 className="font-family-sora font-semibold text-white text-[18px] text-center">Status</h1>
                </div>
                <div className="w-[100px] flex flex-row justify-start items-center">
                    <h1 className="font-family-sora font-semibold text-white text-[18px] text-center">Pose Score</h1>
                </div>
                <div className="w-[150px] flex flex-row justify-start items-center">
                    <h1 className="font-family-sora font-semibold text-white text-[18px] text-center">Node IP</h1>
                </div>
                <div className="w-[120px] flex flex-row justify-center items-center">
                    <h1 className="font-family-sora font-semibold text-white text-[18px] text-center">Rewards</h1>
                </div>
                <div className="w-[90px] flex flex-row justify-start items-center">
                    <h1 className="font-family-sora font-semibold text-white text-[18px] text-center">Next Pay</h1>
                </div>
                <div className="w-[110px] flex flex-row justify-start items-center">
                    <h1 className="font-family-sora font-semibold text-white text-[18px] text-center">Hosting Plan</h1>
                </div>
                <div className="w-[140px] flex flex-row justify-center items-center">
                    <h1 className="font-family-sora font-semibold text-white text-[18px] text-center">Expiratin Date</h1>
                </div>
                <div className="w-[75px] h-[33px]">
                </div>
            </div>
            <div className="w-full h-[56px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[76px]">
                <div className="w-full h-full bg-[#1C1840] rounded-[76px] flex flex-row justify-between items-center px-[40px] py-[15px]">
                    <div className="w-[70px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px]">George</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">Online</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">0</h1>
                    </div>
                    <div className="w-[150px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">15.25.111.25.11:8788</h1>
                    </div>
                    <div className="w-[120px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">202,260</div>
                        <Image src="/neoxa_button/neoxa-coin.svg" alt="neoxa-coin" width={100} height={100} className="w-[20px] h-[20px]" />
                    </div>
                    <div className="w-[90px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">8 Hrs Left</h1>
                    </div>
                    <div className="w-[110px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">6 Months</h1>
                    </div>
                    <div className="w-[140px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">16 Jul 2024</div>
                        <Image src="/dashboard/refresh.svg" alt="refresh" width={100} height={100} className="w-[16px] h-[16px]" />
                    </div>
                    <div className="w-[75px] h-[33px] bg-[#404768] rounded-[18px] flex justify-center items-center">
                        <button className="font-family-sora font-regular text-white text-[14px] text-center cursor-pointer">Details</button>
                    </div>
                </div>
            </div>
            <div className="w-full h-[56px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[76px]">
                <div className="w-full h-full bg-[#1C1840] rounded-[76px] flex flex-row justify-between items-center px-[40px] py-[15px]">
                    <div className="w-[70px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px]">George</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">Syncing</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">2150</h1>
                    </div>
                    <div className="w-[150px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">15.16.150.55.11:8788</h1>
                    </div>
                    <div className="w-[120px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">20,240</div>
                        <Image src="/neoxa_button/neoxa-coin.svg" alt="neoxa-coin" width={100} height={100} className="w-[20px] h-[20px]" />
                    </div>
                    <div className="w-[90px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">-</h1>
                    </div>
                    <div className="w-[110px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">6 Months</h1>
                    </div>
                    <div className="w-[140px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">16 Sep 2024</div>
                        <Image src="/dashboard/refresh.svg" alt="refresh" width={100} height={100} className="w-[16px] h-[16px]" />
                    </div>
                    <div className="w-[75px] h-[33px] bg-[#404768] rounded-[18px] flex justify-center items-center">
                        <button className="font-family-sora font-regular text-white text-[14px] text-center cursor-pointer">Details</button>
                    </div>
                </div>
            </div>
            <div className="w-full h-[56px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[76px]">
                <div className="w-full h-full bg-[#1C1840] rounded-[76px] flex flex-row justify-between items-center px-[40px] py-[15px]">
                    <div className="w-[70px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px]">George</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">Offline</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">Pose Banned</h1>
                    </div>
                    <div className="w-[150px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">15.30.125.25.11:8788</h1>
                    </div>
                    <div className="w-[120px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">12,260</div>
                        <Image src="/neoxa_button/neoxa-coin.svg" alt="neoxa-coin" width={100} height={100} className="w-[20px] h-[20px]" />
                    </div>
                    <div className="w-[90px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">-</h1>
                    </div>
                    <div className="w-[110px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">6 Months</h1>
                    </div>
                    <div className="w-[140px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">23 Aug 2024</div>
                        <Image src="/dashboard/refresh.svg" alt="refresh" width={100} height={100} className="w-[16px] h-[16px]" />
                    </div>
                    <div className="w-[75px] h-[33px] bg-[#404768] rounded-[18px] flex justify-center items-center">
                        <button className="font-family-sora font-regular text-white text-[14px] text-center cursor-pointer">Details</button>
                    </div>
                </div>
            </div>
            <div className="w-full h-[56px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[76px]">
                <div className="w-full h-full bg-[#1C1840] rounded-[76px] flex flex-row justify-between items-center px-[40px] py-[15px]">
                    <div className="w-[70px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px]">George</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">Offline</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">0</h1>
                    </div>
                    <div className="w-[150px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">15.25.111.25.11:8788</h1>
                    </div>
                    <div className="w-[120px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">202,260</div>
                        <Image src="/neoxa_button/neoxa-coin.svg" alt="neoxa-coin" width={100} height={100} className="w-[20px] h-[20px]" />
                    </div>
                    <div className="w-[90px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">8 Hrs Left</h1>
                    </div>
                    <div className="w-[110px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">6 Months</h1>
                    </div>
                    <div className="w-[140px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">16 Jul 2024</div>
                        <Image src="/dashboard/refresh.svg" alt="refresh" width={100} height={100} className="w-[16px] h-[16px]" />
                    </div>
                    <div className="w-[75px] h-[33px] bg-[#404768] rounded-[18px] flex justify-center items-center">
                        <button className="font-family-sora font-regular text-white text-[14px] text-center cursor-pointer">Details</button>
                    </div>
                </div>
            </div>
            <div className="w-full h-[56px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[76px]">
                <div className="w-full h-full bg-[#1C1840] rounded-[76px] flex flex-row justify-between items-center px-[40px] py-[15px]">
                    <div className="w-[70px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px]">George</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">Offline</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">2150</h1>
                    </div>
                    <div className="w-[150px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">15.26.150.55.11:8788</h1>
                    </div>
                    <div className="w-[120px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">202,240</div>
                        <Image src="/neoxa_button/neoxa-coin.svg" alt="neoxa-coin" width={100} height={100} className="w-[20px] h-[20px]" />
                    </div>
                    <div className="w-[90px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">-</h1>
                    </div>
                    <div className="w-[110px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">6 Months</h1>
                    </div>
                    <div className="w-[140px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">16 Sep 2024</div>
                        <Image src="/dashboard/refresh.svg" alt="refresh" width={100} height={100} className="w-[16px] h-[16px]" />
                    </div>
                    <div className="w-[75px] h-[33px] bg-[#404768] rounded-[18px] flex justify-center items-center">
                        <button className="font-family-sora font-regular text-white text-[14px] text-center cursor-pointer">Details</button>
                    </div>
                </div>
            </div>
            <div className="w-full h-[56px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[76px]">
                <div className="w-full h-full bg-[#1C1840] rounded-[76px] flex flex-row justify-between items-center px-[40px] py-[15px]">
                    <div className="w-[70px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px]">George</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">Offline</h1>
                    </div>
                    <div className="w-[100px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">Pose Banned</h1>
                    </div>
                    <div className="w-[150px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">15.30.125.25.11:8788</h1>
                    </div>
                    <div className="w-[120px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">12,260</div>
                        <Image src="/neoxa_button/neoxa-coin.svg" alt="neoxa-coin" width={100} height={100} className="w-[20px] h-[20px]" />
                    </div>
                    <div className="w-[90px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">-</h1>
                    </div>
                    <div className="w-[110px] flex flex-row justify-start items-center">
                        <h1 className="font-family-sora font-regular text-white text-[14px] text-center">6 Months</h1>
                    </div>
                    <div className="w-[140px] flex flex-row justify-center items-center gap-[15px]">
                        <div className="font-family-sora font-regular text-white text-[14px] text-center">23 Aug 2024</div>
                        <Image src="/dashboard/refresh.svg" alt="refresh" width={100} height={100} className="w-[16px] h-[16px]" />
                    </div>
                    <div className="w-[75px] h-[33px] bg-[#404768] rounded-[18px] flex justify-center items-center">
                        <button className="font-family-sora font-regular text-white text-[14px] text-center cursor-pointer">Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
