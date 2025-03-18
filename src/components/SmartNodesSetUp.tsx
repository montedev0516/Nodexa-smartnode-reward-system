export default function SmartNodesSetUp() {
    return (
        <main className="pt-6 pb-[230px]">
            <div className="w-full flex flex-col justify-center items-center text-center">
                <div className="w-full text-[30px] font-family-sora font-bold py-[20px]">SMARTNODE SETUP</div>
                <div className="w-full h-[2px] bg-gradient-to-r from-[#221E45] via-[#00AEB9] to-[#221E45]">
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-[30px] py-[40px]">
                    <div className="w-full flex flex-row justify-start items-center gap-[30px]">
                        <div className="p-[1px] bg-gradient-to-r from-[#00AEB9] to-[#EC008C] rounded-[32px]">
                            <div className="w-full flex flex-row justify-between items-center bg-[#1C1840] text-[18px] text-white font-family-sora font-semibold rounded-[32px] px-[28px] py-[13px]">
                                Step: 01
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col xl:flex-row justify-between items-center gap-[20px]">
                    <div className="xl:w-[297px] xl:h-[195px] 2xl:w-[350px] 2xl:h-[195px] w-full bg-[#1C1840] flex flex-col justify-start items-center border-1 border-[#00AEB9] rounded-[10px] px-[22px] py-[20px]">
                        <div className="w-full flex flex-row justify-start items-center pb-[15px]">
                            <div className="w-[31px] h-[31px] bg-[#EC008C] rounded-full text-white text-[14px] font-family-sora font-bold flex justify-center items-center text-center">
                                #1
                            </div>
                        </div>
                        <div className="w-full text-[15px] text-start text-white font-family-sora font-regular">
                            On your QT wallet open the NEOXA debug console from the top menu -&gt; tools -&gt; debug console.
                        </div>
                    </div>
                    <div className="xl:w-[297px] xl:h-[195px] 2xl:w-[350px] 2xl:h-[195px] w-full bg-[#1C1840] flex flex-col justify-start items-center text-left border-1 border-[#00AEB9] rounded-[10px] px-[22px] py-[20px]">
                        <div className="w-full flex flex-row justify-start items-center pb-[15px]">
                            <div className="w-[31px] h-[31px] bg-[#EC008C] rounded-full text-white text-[14px] font-family-sora font-bold flex justify-center items-center text-center">
                                #2
                            </div>
                        </div>
                        <div className="w-full text-[15px] text-start text-white font-family-sora font-regular">
                            In the Debug console type &quot;getnewaddress&quot;. An address will be generated, it will be referred to as the &quot;collateral address&quot;.
                        </div>
                    </div>
                    <div className="xl:w-[297px] xl:h-[195px] 2xl:w-[350px] 2xl:h-[195px] w-full bg-[#1C1840] flex flex-col justify-start items-center text-left border-1 border-[#00AEB9] rounded-[10px] px-[22px] py-[20px]">
                        <div className="w-full flex flex-row justify-start items-center pb-[15px]">
                            <div className="w-[31px] h-[31px] bg-[#EC008C] rounded-full text-white text-[14px] font-family-sora font-bold flex justify-center items-center text-center">
                                #3
                            </div>
                        </div>
                        <div className="w-full text-[15px] text-start text-white font-family-sora font-regular">
                            Send exactly 1,000,000 NEOXA to the collateral address you just generated. Make sure that &quot;Subtract fee from amount&quot; is NOT checked.
                        </div>
                    </div>
                    <div className="xl:w-[299px] xl:h-[195px] 2xl:w-[350px] 2xl:h-[195px] w-full bg-[#1C1840] flex flex-col justify-start items-center text-left border-1 border-[#00AEB9] rounded-[10px] px-[22px] py-[20px]">
                        <div className="w-full flex flex-row justify-start items-center pb-[15px]">
                            <div className="w-[31px] h-[31px] bg-[#EC008C] rounded-full text-white text-[14px] font-family-sora font-bold flex justify-center items-center text-center">
                                #4
                            </div>
                        </div>
                        <div className="w-full text-[15px] text-start text-white font-family-sora font-regular">
                            Go to settings -&gt; options -&gt; wallet -&gt; tick the &quot;enable coin control features&quot; and press OK. 
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col xl:flex-row justify-between items-center gap-[20px] py-[20px]">
                    <div className="xl:w-[297px] xl:h-[195px] 2xl:w-[350px] 2xl:h-[195px] w-full bg-[#1C1840] flex flex-col justify-start items-center text-left border-1 border-[#00AEB9] rounded-[10px] px-[22px] py-[20px]">
                        <div className="w-full flex flex-row justify-start items-center pb-[15px]">
                            <div className="w-[31px] h-[31px] bg-[#EC008C] rounded-full text-white text-[14px] font-family-sora font-bold flex justify-center items-center text-center">
                                #5
                            </div>
                        </div>
                        <div className="w-full text-[15px] text-start text-white font-family-sora font-regular">
                            On the &quot;Send&quot; tab click &quot;inputs&quot; button and locate the 1,000,000 NEOXA transaction that executed as described on step 3.
                        </div>
                    </div>
                    <div className="xl:w-[297px] xl:h-[195px] 2xl:w-[350px] 2xl:h-[195px] w-full bg-[#1C1840] flex flex-col justify-start items-center text-left border-1 border-[#00AEB9] rounded-[10px] px-[22px] py-[20px]">
                        <div className="w-full flex flex-row justify-start items-center pb-[15px]">
                            <div className="w-[31px] h-[31px] bg-[#EC008C] rounded-full text-white text-[14px] font-family-sora font-bold flex justify-center items-center text-center">
                                #6
                            </div>
                        </div>
                        <div className="w-full text-[15px] text-start text-white font-family-sora font-regular">
                            Right click on this transaction and press &quot;lock unspent&quot; (A lock will appear next of this transaction).
                        </div>
                    </div>
                    <div className="xl:w-[297px] xl:h-[195px] 2xl:w-[350px] 2xl:h-[195px] w-full bg-[#1C1840] flex flex-col justify-start items-center text-left border-1 border-[#00AEB9] rounded-[10px] px-[22px] py-[20px]">
                        <div className="w-full flex flex-row justify-start items-center pb-[15px]">
                            <div className="w-[31px] h-[31px] bg-[#EC008C] rounded-full text-white text-[14px] font-family-sora font-bold flex justify-center items-center text-center">
                                #7
                            </div>
                        </div>
                        <div className="w-full text-[15px] text-start text-white font-family-sora font-regular">
                            Right click again on the same transaction, press &quot;copy transaction ID&quot; then &quot;OK&quot;.
                        </div>
                    </div>
                    <div className="xl:w-[299px] xl:h-[195px] 2xl:w-[350px] 2xl:h-[195px] w-full bg-[#1C1840] flex flex-col justify-start items-center text-left border-1 border-[#00AEB9] rounded-[10px] px-[22px] py-[20px]">
                        <div className="w-full flex flex-row justify-start items-center pb-[15px]">
                            <div className="w-[31px] h-[31px] bg-[#EC008C] rounded-full text-white text-[14px] font-family-sora font-bold flex justify-center items-center text-center">
                                #8
                            </div>
                        </div>
                        <div className="w-full text-[15px] text-start text-white font-family-sora font-regular">
                            Paste this ID below and press &quot;Next&quot; button.
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-[29px] pt-[20px]">
                    <div className="border-1 border-[#EC008C] rounded-[11px] px-[200px] lg:px-[313px] 2xl:px-[400px] py-[13px] text-center text-[18px] text-[#B2A6A6] font-family-satoshi_variable font-regular">
                        Paste transaction ID here
                    </div>
                    <button className="bg-[#3CDD22] rounded-[33px] text-center text-[13px] text-white font-family-sora font-bold px-[50px] py-[12px]">NEXT</button>
                </div>
            </div>
        </main>
    )
}
