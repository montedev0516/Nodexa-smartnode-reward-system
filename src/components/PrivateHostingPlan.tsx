
export default function PrivateHostingPlan() {
    return (
        <main className="pt-[20px] pb-[30px]">
            <div className="flex flex-col justify-center items-center text-center">
                <div className="p-[1px] bg-gradient-to-b from-[#1EC0CA] via-[#1EC0CA] to-[#1EC0CA36] rounded-[36px]">
                    <div className="w-full h-full bg-gradient-to-t from-[#0F0F0F] to-[#252525] rounded-[36px] px-[30px] md:px-[99px]">
                        <h1 className="text-[30px] font-family-sora font-semibold text-center pt-[30px] pb-[20px]">Choose Hosting Plan</h1>
                        <div className="flex sm:flex-row flex-col justify-between items-center gap-[17px] pb-[32px]">
                            <div className="inline-block w-[147px] h-[40px] p-[1px] bg-gradient-to-r from-[#00AEB9] to-[#EC008C] rounded-[34px]">
                                <button className="w-full h-full bg-[#252525] text-white font-family-sora font-semibold text-[18px] rounded-[34px] cursor-pointer">1 Month</button>
                            </div>
                            <div className="inline-block w-[147px] h-[40px] p-[1px] bg-gradient-to-r from-[#00AEB9] to-[#EC008C] rounded-[34px]">
                                <button className="w-full h-full bg-[#252525] text-white font-family-sora font-semibold text-[18px] rounded-[34px] cursor-pointer">3 Months</button>
                            </div>
                            <div className="inline-block w-[147px] h-[40px] p-[1px] bg-gradient-to-r from-[#00AEB9] to-[#EC008C] rounded-[34px]">
                                <button className="w-full h-full bg-[#252525] text-white font-family-sora font-semibold text-[18px] rounded-[34px] cursor-pointer">6 Months</button>
                            </div>
                        </div>
                        <h1 className="text-[25px] font-family-sora font-semibold text-center pb-[30px]">PRICE: 12$</h1>
                        <div className="w-full flex justify-center items-center pb-[22px]">
                        <button className="bg-gradient-to-b from-[#F091C9] to-[#EC008C] flex justify-center items-center text-center rounded-[19px] px-[30px] py-[10px] text-white font-family-sora text-[17px] font-bold cursor-pointer">HOST</button>
                        </div>
                    </div>
                </div> 
            </div>
        </main>
    )
}
