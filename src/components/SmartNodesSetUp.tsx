interface SetupStep {
    id: number;
    description: string;
}

const setupSteps: SetupStep[] = [
    {
        id: 1,
        description: "On your QT wallet open the NEOXA debug console from the top menu -> tools -> debug console."
    },
    {
        id: 2,
        description: 'In the Debug console type "getnewaddress". An address will be generated, it will be referred to as the "collateral address".'
    },
    {
        id: 3,
        description: 'Send exactly 1,000,000 NEOXA to the collateral address you just generated. Make sure that "Subtract fee from amount" is NOT checked.'
    },
    {
        id: 4,
        description: 'Go to settings -> options -> wallet -> tick the "enable coin control features" and press OK.'
    },
    {
        id: 5,
        description: 'On the "Send" tab click "inputs" button and locate the 1,000,000 NEOXA transaction that executed as described on step 3.'
    },
    {
        id: 6,
        description: 'Right click on this transaction and press "lock unspent" (A lock will appear next of this transaction).'
    },
    {
        id: 7,
        description: 'Right click again on the same transaction, press "copy transaction ID" then "OK".'
    },
    {
        id: 8,
        description: 'Paste this ID below and press "Next" button.'
    }
];

const StepIndicator = () => (
    <div className="w-full flex flex-row justify-start items-center gap-[30px]">
        <div className="p-[1px] bg-gradient-to-r from-[#00AEB9] to-[#EC008C] rounded-[32px]">
            <div className="w-full flex flex-row justify-between items-center bg-[#1C1840] text-[18px] text-white font-family-sora font-semibold rounded-[32px] px-[28px] py-[13px]">
                Step: 01
            </div>
        </div>
    </div>
);

const StepCard = ({ step }: { step: SetupStep }) => (
    <div className="xl:w-[297px] xl:h-[195px] 2xl:w-[350px] 2xl:h-[195px] w-full bg-[#1C1840] flex flex-col justify-start items-center text-left border-1 border-[#00AEB9] rounded-[10px] px-[22px] py-[20px]">
        <div className="w-full flex flex-row justify-start items-center pb-[15px]">
            <div className="w-[31px] h-[31px] bg-[#EC008C] rounded-full text-white text-[14px] font-family-sora font-bold flex justify-center items-center text-center">
                #{step.id}
            </div>
        </div>
        <div className="w-full text-[15px] text-start text-white font-family-sora font-regular">
            {step.description}
        </div>
    </div>
);

const TransactionInput = () => (
    <div className="w-full flex flex-col justify-center items-center gap-[29px] pt-[20px]">
        <div className="border-1 border-[#EC008C] rounded-[11px] px-[100px] sm:px-[200px] lg:px-[313px] 2xl:px-[400px] py-[13px] text-center text-[18px] text-[#B2A6A6] font-family-satoshi_variable font-regular">
            Paste transaction ID here
        </div>
        <button className="bg-[#3CDD22] rounded-[33px] text-center text-[13px] text-white font-family-sora font-bold px-[50px] py-[12px]">
            NEXT
        </button>
    </div>
);

export default function SmartNodesSetUp() {
    return (
        <main className="pt-6 pb-[230px]">
            <div className="w-full flex flex-col justify-center items-center text-center">
                <div className="w-full text-[30px] font-family-sora font-bold py-[20px]">SMARTNODE SETUP</div>
                <div className="w-full h-[2px] bg-gradient-to-r from-[#221E45] via-[#00AEB9] to-[#221E45]" />
                
                <div className="w-full flex flex-col justify-center items-center gap-[30px] py-[40px]">
                    <StepIndicator />
                </div>

                <div className="w-full flex flex-col xl:flex-row justify-between items-center gap-[20px]">
                    {setupSteps.slice(0, 4).map((step) => (
                        <StepCard key={step.id} step={step} />
                    ))}
                </div>

                <div className="w-full flex flex-col xl:flex-row justify-between items-center gap-[20px] py-[20px]">
                    {setupSteps.slice(4).map((step) => (
                        <StepCard key={step.id} step={step} />
                    ))}
                </div>

                <TransactionInput />
            </div>
        </main>
    );
}
