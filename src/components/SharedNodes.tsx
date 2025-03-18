import Image from "next/image"

export default function SharedNodes() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-[40px] pt-[120px] pb-[200px]">
            <div className="w-full h-[198px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[76px]">
                <div className="w-full h-full bg-[#1C1840] rounded-[76px] flex flex-col justify-between items-center gap-[26px] px-[50px] py-[25px]">
                    <div className="w-full h-[70px] flex flex-row justify-between items-center">
                        <div className="w-[60px] h-full flex justify-start items-center">
                            <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#EC008C] rounded-full text-white text-[18px] font-family-sora font-bold">56</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Status</div>
                            <div className="flex justify-start items-center text-grey-500 text-[16px] font-family-sora font-normal">Active</div>
                        </div>
                        <div className="w-[170px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Pose Score</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">0</div>
                        </div>
                        <div className="w-[250px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Node Address</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">Fhi43n4n5o6icd4min4k33</div>
                        </div>
                        <div className="w-[180px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Node IP</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">15.25.111.25.11:8788</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Rewards</div>
                            <div className="flex flex-row justify-center items-center gap-[15px]">
                                <div className="text-grey-500 text-[16px] font-family-sora font-regular">202,260</div>
                                <Image src="/neoxa_button/neoxa-coin.svg" alt="arrow-up" width={16} height={16} className="w-[22px] h-[22px]" />
                            </div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Next Pay</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">8 Hrs Left</div>
                        </div>
                    </div>
                    <div className="w-full h-[70px] flex flex-row justify-between items-center">
                        <div className="w-[60px] h-full flex justify-start items-center">
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Participants</div>
                            <div className="flex justify-start items-center text-grey-500 text-[16px] font-family-sora font-normal">03</div>
                        </div>
                        <div className="w-[170px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">My Collateral</div>
                            <div className="flex flex-row justify-center items-center gap-[15px]">
                                <div className="text-grey-500 text-[16px] font-family-sora font-regular">300,000</div>
                                <Image src="/neoxa_button/neoxa-coin.svg" alt="arrow-up" width={16} height={16} className="w-[22px] h-[22px]" />
                            </div>
                        </div>
                        <div className="w-[250px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">My Rewards</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">50,000</div>
                        </div>
                        <div className="w-[180px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Hosting Plan</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">6 Months</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Ends In</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">Dd/Hh/Mm</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-start items-center">
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[198px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[76px]">
                <div className="w-full h-full bg-[#1C1840] rounded-[76px] flex flex-col justify-between items-center gap-[26px] px-[50px] py-[25px]">
                    <div className="w-full h-[70px] flex flex-row justify-between items-center">
                        <div className="w-[60px] h-full flex justify-start items-center">
                            <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#EC008C] rounded-full text-white text-[18px] font-family-sora font-bold">56</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Status</div>
                            <div className="flex justify-start items-center text-grey-500 text-[16px] font-family-sora font-normal">Active</div>
                        </div>
                        <div className="w-[170px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Pose Score</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">0</div>
                        </div>
                        <div className="w-[250px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Node Address</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">Fhi43n4n5o6icd4min4k33</div>
                        </div>
                        <div className="w-[180px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Node IP</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">15.25.111.25.11:8788</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Rewards</div>
                            <div className="flex flex-row justify-center items-center gap-[15px]">
                                <div className="text-grey-500 text-[16px] font-family-sora font-regular">202,260</div>
                                <Image src="/neoxa_button/neoxa-coin.svg" alt="arrow-up" width={16} height={16} className="w-[22px] h-[22px]" />
                            </div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Next Pay</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">8 Hrs Left</div>
                        </div>
                    </div>
                    <div className="w-full h-[70px] flex flex-row justify-between items-center">
                        <div className="w-[60px] h-full flex justify-start items-center">
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Participants</div>
                            <div className="flex justify-start items-center text-grey-500 text-[16px] font-family-sora font-normal">03</div>
                        </div>
                        <div className="w-[170px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">My Collateral</div>
                            <div className="flex flex-row justify-center items-center gap-[15px]">
                                <div className="text-grey-500 text-[16px] font-family-sora font-regular">300,000</div>
                                <Image src="/neoxa_button/neoxa-coin.svg" alt="arrow-up" width={16} height={16} className="w-[22px] h-[22px]" />
                            </div>
                        </div>
                        <div className="w-[250px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">My Rewards</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">50,000</div>
                        </div>
                        <div className="w-[180px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Hosting Plan</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">6 Months</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Ends In</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">Dd/Hh/Mm</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-start items-center">
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[198px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[76px]">
                <div className="w-full h-full bg-[#1C1840] rounded-[76px] flex flex-col justify-between items-center gap-[26px] px-[50px] py-[25px]">
                    <div className="w-full h-[70px] flex flex-row justify-between items-center">
                        <div className="w-[60px] h-full flex justify-start items-center">
                            <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#EC008C] rounded-full text-white text-[18px] font-family-sora font-bold">56</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Status</div>
                            <div className="flex justify-start items-center text-grey-500 text-[16px] font-family-sora font-normal">Active</div>
                        </div>
                        <div className="w-[170px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Pose Score</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">0</div>
                        </div>
                        <div className="w-[250px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Node Address</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">Fhi43n4n5o6icd4min4k33</div>
                        </div>
                        <div className="w-[180px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Node IP</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">15.25.111.25.11:8788</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Rewards</div>
                            <div className="flex flex-row justify-center items-center gap-[15px]">
                                <div className="text-grey-500 text-[16px] font-family-sora font-regular">202,260</div>
                                <Image src="/neoxa_button/neoxa-coin.svg" alt="arrow-up" width={16} height={16} className="w-[22px] h-[22px]" />
                            </div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Next Pay</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">8 Hrs Left</div>
                        </div>
                    </div>
                    <div className="w-full h-[70px] flex flex-row justify-between items-center">
                        <div className="w-[60px] h-full flex justify-start items-center">
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Participants</div>
                            <div className="flex justify-start items-center text-grey-500 text-[16px] font-family-sora font-normal">03</div>
                        </div>
                        <div className="w-[170px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">My Collateral</div>
                            <div className="flex flex-row justify-center items-center gap-[15px]">
                                <div className="text-grey-500 text-[16px] font-family-sora font-regular">300,000</div>
                                <Image src="/neoxa_button/neoxa-coin.svg" alt="arrow-up" width={16} height={16} className="w-[22px] h-[22px]" />
                            </div>
                        </div>
                        <div className="w-[250px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">My Rewards</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">50,000</div>
                        </div>
                        <div className="w-[180px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Hosting Plan</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">6 Months</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center text-white text-[18px] font-family-sora font-semibold">Ends In</div>
                            <div className="flex justify-center items-center text-grey-500 text-[16px] font-family-sora font-normal">Dd/Hh/Mm</div>
                        </div>
                        <div className="w-[150px] h-full flex flex-col justify-start items-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
