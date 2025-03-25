interface HostingPlan {
    id: string;
    neoxaDeposited: {
        current: number;
        total: number;
        percentage: number;
    };
    depositCollateral: {
        range: string;
    };
    participants: {
        current: number;
        total: number;
    };
    requestEndsIn: string;
    duration: string;
}

const hostingPlansData: HostingPlan[] = [
    {
        id: "01",
        neoxaDeposited: {
            current: 0,
            total: 1000000,
            percentage: 0
        },
        depositCollateral: {
            range: "100000-900000"
        },
        participants: {
            current: 0,
            total: 4
        },
        requestEndsIn: "13h : 34m : 21s",
        duration: "1 Month"
    },
    {
        id: "02",
        neoxaDeposited: {
            current: 100000,
            total: 1000000,
            percentage: 10
        },
        depositCollateral: {
            range: "100000-900000"
        },
        participants: {
            current: 1,
            total: 4
        },
        requestEndsIn: "13h : 34m : 21s",
        duration: "1 Month"
    },
    {
        id: "03",
        neoxaDeposited: {
            current: 500000,
            total: 1000000,
            percentage: 50
        },
        depositCollateral: {
            range: "100000-900000"
        },
        participants: {
            current: 2,
            total: 4
        },
        requestEndsIn: "13h : 34m : 21s",
        duration: "1 Month"
    },
    {
        id: "0000",
        neoxaDeposited: {
            current: 800000,
            total: 1000000,
            percentage: 80
        },
        depositCollateral: {
            range: "100000-2000000"
        },
        participants: {
            current: 3,
            total: 4
        },
        requestEndsIn: "13h : 34m : 21s",
        duration: "1 Month"
    }
];

const HostingPlanCard = ({ plan }: { plan: HostingPlan }) => {
    return (
        <div className="w-full p-[1px] bg-gradient-to-l from-[#00AEB9] to-[#EC008C] rounded-[32px]">
            <div className="w-full h-full flex flex-col justify-center items-center space-y-[30px] bg-[#1C1840] rounded-[32px] py-[25px] px-[36px] 2xl:px-[80px]">
                {/* Desktop Header */}
                <div className="hidden w-full sm:flex flex-row justify-between items-center text-center">
                    <h1 className="text-[27px] text-white font-family-sora font-semibold"># {plan.id}</h1>
                    <h1 className="text-[27px] text-white font-family-sora font-semibold">Hosting Plan</h1>
                    <div className="p-[1px] bg-gradient-to-r from-[#00AEB9] to-[#EC008C] rounded-[32px]">
                        <div className="bg-[#1C1840] rounded-[32px] font-size-[16px] font-family-sora text-white font-semibold py-[10px] px-[30px]">
                            {plan.duration}
                        </div>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="sm:hidden w-full flex flex-col justify-between items-center gap-[20px] text-center">
                    <div className="w-full flex flex-row justify-between items-center text-center">
                        <h1 className="text-[27px] text-white font-family-sora font-semibold"># {plan.id}</h1>
                        <h1 className="text-[27px] text-white font-family-sora font-semibold">Hosting Plan</h1>
                    </div>
                    <div className="w-full p-[1px] bg-gradient-to-r from-[#00AEB9] to-[#EC008C] rounded-[32px]">
                        <div className="bg-[#1C1840] rounded-[32px] font-size-[16px] font-family-sora text-white font-semibold py-[10px] px-[30px]">
                            {plan.duration}
                        </div>
                    </div>
                </div>

                {/* Desktop Content */}
                <div className="hidden w-full sm:flex flex-col justify-between items-center space-y-[11px] text-center">
                    <div className="w-full flex flex-row justify-between items-center text-start">
                        <div className="w-[188px] text-[18px] text-white font-family-sora font-regular">Neoxa Been Deposited</div>
                        <div className="w-[201px] border-1 border-[#EC008C] flex justify-center items-center text-center rounded-[10px] px-[37px] py-[10px]">
                            {plan.neoxaDeposited.current.toLocaleString()}/{plan.neoxaDeposited.total.toLocaleString()}
                        </div>
                        <div className="w-[95px] text-[18px] text-white font-family-sora font-regular text-center">({plan.neoxaDeposited.percentage}%)</div>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center gap-[23px] text-start">
                        <div className="w-[188px] text-[18px] text-white font-family-sora font-regular">Deposit Collateral</div>
                        <div className="w-[201px] border-1 border-[#EC008C] flex justify-center items-center text-center rounded-[10px] px-[37px] py-[10px]">
                            {plan.depositCollateral.range}
                        </div>
                        <div className="w-[95px] flex justify-center items-center">
                            <button className="border-2 border-[#3CDD22] bg-[#3CDD2240] flex justify-center items-center text-center rounded-[20px] px-[16px] py-[11px] text-[#3DDE22] font-family-sora text-[12px] font-semibold cursor-pointer">
                                DEPOSIT
                            </button>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-betweem items-center text-start">
                        <div className="w-[188px] text-[18px] text-white font-family-sora font-regular">
                            Participants: {plan.participants.current}/{plan.participants.total}
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center text-start">
                        <div className="w-[188px] text-[18px] text-white font-family-sora font-regular">Request Ends In:</div>
                        <div className="w-[201px] flex justify-center items-center text-center text-[22px] font-bold">{plan.requestEndsIn}</div>
                        <div className="w-[95px] flex justify-center items-center">
                            <button className="bg-gradient-to-b from-[#F091C9] to-[#EC008C] flex justify-center items-center text-center rounded-[19px] px-[20px] py-[11px] text-white font-family-sora text-[12px] font-semibold cursor-pointer">
                                PROCEED
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Content */}
                <div className="sm:hidden w-full flex flex-col justify-between items-center gap-[20px] text-center">
                    <div className="w-full flex flex-col justify-start items-center text-start">
                        <div className="w-full text-[18px] text-white font-family-sora font-regular">Neoxa Been Deposited</div>
                        <div className="w-full flex flex-row justify-end items-center gap-[20px] text-start">
                            <div className="w-[201px] border-1 border-[#EC008C] flex justify-center items-center text-center rounded-[10px]">
                                {plan.neoxaDeposited.current.toLocaleString()}/{plan.neoxaDeposited.total.toLocaleString()}
                            </div>
                            <div className="w-[95px] text-[18px] text-white font-family-sora font-regular text-center">({plan.neoxaDeposited.percentage}%)</div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start items-center text-start">
                        <div className="w-full text-[18px] text-white font-family-sora font-regular">Deposit Collateral</div>
                        <div className="w-full flex flex-row justify-end items-center gap-[20px] text-start">
                            <div className="w-[201px] border-1 border-[#EC008C] flex justify-center items-center text-center rounded-[10px]">
                                {plan.depositCollateral.range}
                            </div>
                            <div className="w-[95px] flex justify-center items-center">
                                <button className="border-2 border-[#3CDD22] bg-[#3CDD2240] flex justify-center items-center text-center rounded-[20px] px-[16px] py-[11px] text-[#3DDE22] font-family-sora text-[12px] font-semibold cursor-pointer">
                                    DEPOSIT
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start items-center text-start">
                        <div className="w-full text-[18px] text-white font-family-sora font-regular">
                            Participants: {plan.participants.current}/{plan.participants.total}
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start items-center text-start">
                        <div className="w-full text-[18px] text-white font-family-sora font-regular">Request Ends In:</div>
                        <div className="w-full flex flex-row justify-end items-center gap-[20px] text-start">
                            <div className="w-[201px] flex justify-center items-center text-center text-[18px] font-semibold">{plan.requestEndsIn}</div>
                            <div className="w-[95px] flex justify-center items-center">
                                <button className="bg-gradient-to-b from-[#F091C9] to-[#EC008C] flex justify-center items-center text-center rounded-[19px] px-[20px] py-[11px] text-white font-family-sora text-[12px] font-semibold cursor-pointer">
                                    PROCEED
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function SharedHostingPlan() {
    return (
        <main className="pt-14 pb-6">
            <div className="flex flex-col xl:flex-row justify-between items-center gap-[28px] 2xl:gap-[150px] text-center py-[20px]">
                {hostingPlansData.slice(0, 2).map((plan, index) => (
                    <HostingPlanCard key={index} plan={plan} />
                ))}
            </div>
            <div className="flex flex-col xl:flex-row justify-between items-center gap-[28px] 2xl:gap-[150px] text-center py-[20px]">
                {hostingPlansData.slice(2, 4).map((plan, index) => (
                    <HostingPlanCard key={index + 2} plan={plan} />
                ))}
            </div>
        </main>
    );
}
