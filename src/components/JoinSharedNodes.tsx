
export default function JoinSharedNodes() {
    return (
        <main className="pt-[20px] pb-[30px]">
            <div className="flex flex-col justify-center items-center text-center">
                <div className="text-[30px] font-family-sora font-bold pb-[30px]">JOIN A SHARED NODE</div>
                <div className=" frame-border rounded-[32px]">
                    <div className="w-full h-full frame-body rounded-[32px] px-[30px] md:px-[105px]">
                        <h1 className="text-[30px] font-family-sora font-semibold text-center pt-[35px] pb-[20px]">Choose Hosting Plan</h1>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-[17px] pb-[35px]">
                            <div className="inline-block w-full sm:w-[147px] h-[40px] p-[2px] linearGradient rounded-[34px]">
                                <button className="w-full h-full bg-[#0c1131] text-white font-family-sora font-semibold text-[18px] rounded-[34px] cursor-pointer">1 Month</button>
                            </div>
                            <div className="inline-block w-full sm:w-[147px] h-[40px] p-[2px] linearGradient rounded-[34px]">
                                <button className="w-full h-full bg-[#0c1131] text-white font-family-sora font-semibold text-[18px] rounded-[34px] cursor-pointer">3 Months</button>
                            </div>
                            <div className="inline-block w-full sm:w-[147px] h-[40px] p-[2px] linearGradient rounded-[34px]">
                                <button className="w-full h-full bg-[#0c1131] text-white font-family-sora font-semibold text-[18px] rounded-[34px] cursor-pointer">6 Months</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
