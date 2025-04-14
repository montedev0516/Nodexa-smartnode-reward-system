"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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

interface StepIndicatorProps {
    currentStep: number;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => (
    <div className="w-full flex flex-row justify-start items-center gap-[30px]">
        <div className="p-[2px] linearGradient rounded-[32px]">
            <div className="w-full flex flex-row justify-between items-center bg-[#1C1840] text-[18px] text-white font-family-sora font-semibold rounded-[32px] px-[28px] py-[13px]">
                Step: {currentStep.toString().padStart(2, '0')}
            </div>
        </div>
    </div>
);

const StepCard = ({ step }: { step: SetupStep }) => (
    <div className="w-full bg-[#1C1840] flex flex-col justify-start items-center text-left border-1 border-[#00AEB9] rounded-[10px] px-[22px] py-[20px]">
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

interface AddressInputProps {
    label: string;
    description: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

const AddressInput = ({ label, description, placeholder = "Paste the address here", value, onChange }: AddressInputProps) => (
    <div className='w-full flex flex-row justify-center items-center px-[6px]'>
        <div className="w-full flex flex-col justify-between items-start gap-2 h-[148px] max-w-[353px]">
            <h3 className="text-white text-xl font-family-sora font-semibold text-left">{label}</h3>
            <p className="text-[#B0B0B0] text-sm font-family-sora text-left">{description}</p>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-[#1C1840] border border-[#00AEB9] rounded-lg px-4 py-3 text-white font-family-sora placeholder-[#4A4A4A]"
            />
        </div>
    </div>

);

interface Step1Props {
    onNext: () => void;
    transactionId: string;
    setTransactionId: (value: string) => void;
}

const Step1 = ({ onNext, transactionId, setTransactionId }: Step1Props) => (
    <>
        <div className="w-full flex flex-col justify-center items-center gap-[30px] mb-[30px]">
            <StepIndicator currentStep={1} />
        </div>

        <div className="max-w-[1250px] w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px]">
            {setupSteps.map((step) => (
                <StepCard key={step.id} step={step} />
            ))}
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-[29px] pt-[20px]">
            <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Paste transaction ID here"
                className="border-1 border-[#EC008C] bg-transparent rounded-[11px] px-[100px] sm:px-[200px] lg:px-[313px] 2xl:px-[400px] py-[13px] text-center text-[18px] text-white font-family-satoshi_variable font-regular placeholder-[#B2A6A6]"
            />
            <button
                onClick={onNext}
                className="bg-[#3CDD22] rounded-[33px] text-center text-[13px] text-white font-family-sora font-bold px-[50px] py-[12px] hover:opacity-90 transition-opacity duration-300"
            >
                NEXT
            </button>
        </div>
    </>
);

interface Step2Props {
    onBack: () => void;
    onNext: () => void;
    addresses: {
        owner: string;
        voting: string;
        payee: string;
        feeSource: string;
    };
    setAddresses: (addresses: {
        owner: string;
        voting: string;
        payee: string;
        feeSource: string;
    }) => void;
    showBackButton?: boolean;
}

const Step2 = ({ onBack, onNext, addresses, setAddresses, showBackButton = true }: Step2Props) => (
    <div className='w-full max-w-[913px] h-full rounded-[27px] border-1 border-[#00AEB9] bg-[#1C1840] pb-[48px]'>
        <div className="w-full flex flex-col justify-center items-center gap-[30px] px-[40px] py-[33px]">
            <StepIndicator currentStep={2} />
        </div>

        <div className="max-w-[1250px] w-full grid grid-cols-1 md:grid-cols-2 px-[85px] gap-[20px]">
            <AddressInput
                label="Owner Address"
                description="Open tools -> debug console. Copy and paste the command 'getnewaddress' then press Enter."
                value={addresses.owner}
                onChange={(value) => setAddresses({ ...addresses, owner: value })}
            />
            <AddressInput
                label="Voting Address"
                description="This address can be the same as the Owner Address."
                value={addresses.voting}
                onChange={(value) => setAddresses({ ...addresses, voting: value })}
            />
            <AddressInput
                label="Payee Address"
                description="This address will receive the smartnode rewards. Any existing wallet address can be used."
                value={addresses.payee}
                onChange={(value) => setAddresses({ ...addresses, payee: value })}
            />
            <AddressInput
                label="Fee Source Address"
                description="You can use as Fee Source address any wallet address that HOLDS some coins."
                value={addresses.feeSource}
                onChange={(value) => setAddresses({ ...addresses, feeSource: value })}
            />
        </div>

        <div className="w-full flex justify-center items-center gap-4 mt-8">
            {showBackButton && (
                <button
                    onClick={onBack}
                    className="bg-[#272E50] text-white rounded-[33px] text-center text-[13px] font-family-sora font-bold px-[50px] py-[12px] hover:opacity-90 transition-opacity duration-300"
                >
                    GO BACK
                </button>
            )}
            <button
                onClick={onNext}
                className="bg-[#3CDD22] rounded-[33px] text-center text-[13px] text-white font-family-sora font-bold px-[50px] py-[12px] hover:opacity-90 transition-opacity duration-300"
            >
                NEXT
            </button>
        </div>
    </div>
);

interface Step3Props {
    onBack: () => void;
    onNext: () => void;
    output: string;
    setOutput: (value: string) => void;
    showBackButton?: boolean;
}

const Step3 = ({ onBack, onNext, output, setOutput, showBackButton = true }: Step3Props) => {
    const commandLines = [
        "protx register_prepare d79f3fcb219ed193dfad3bcb674j91j97a84506e58490c586c92290c6b47404c1",
        "[2b03:c206:2137:280:0470:8]:8788 qawwc7mhbbzcz5a4kjmhtj3yqtrpecc5ko",
        "966935730594f2fb0265eba42f5333550b1110d2103a2e531d2750d1d0a35cbebe0039a874f6429571a",
        "1f349d19f55pqawwc7mhbbzcz5a4kjmhtj3yqtrpeccwvm 0 gtk8nxwyngj2dl9kj6pdxkrjty2e7o9za",
        "gxfqftfmhctjf1nwqi4j5q97ofbqja45aot"
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(commandLines.join(" "));
    };

    return (
        <div className='w-full max-w-[913px] h-full rounded-[27px] border-1 border-[#00AEB9] bg-[#1C1840] pb-[48px]'>
            <div className="w-full flex flex-col justify-center items-center gap-[30px] px-[40px] py-[33px]">
                <StepIndicator currentStep={3} />
            </div>

            <div className="w-full px-[85px]">
                <h2 className="text-white text-2xl font-family-sora font-semibold mb-8 text-left">ProRegTx Transaction</h2>

                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-family-sora font-semibold">1.</span>
                            <p className="text-white font-family-sora">Go to your wallet {`->`} settings {`->`} unlock wallet. Enter your passphrase and unlock your wallet.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-family-sora font-semibold">2.</span>
                            <p className="text-white font-family-sora">As the wallet is unlocked, press tools button {`->`} debug console.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-family-sora font-semibold">3.</span>
                            <p className="text-white font-family-sora">Paste the following command to the debug console and press Enter.</p>
                        </div>
                        <div className="flex flex-col text-[#00AEB9] font-mono text-sm">
                            {commandLines.map((line, index) => (
                                <div key={index} className="flex flex-wrap items-center">
                                    <span className="break-all overflow-wrap-anywhere w-full md:w-auto">{line}</span>
                                    {index === commandLines.length - 1 && (
                                        <button
                                            onClick={handleCopy}
                                            className="mt-2 md:mt-0 md:ml-4 inline-flex items-center gap-2 px-4 rounded-full border border-[#EC008C] text-[#EC008C] hover:opacity-80 transition-opacity"
                                        >
                                            Copy
                                            <Image
                                                src="/nodedetail/copy-icon.svg"
                                                alt= "copy-icon"
                                                width={16}
                                                height={16}
                                                className="w-[16px] h-[16px]"
                                            />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-family-sora font-semibold">4.</span>
                            <p className="text-white font-family-sora">Paste the output here and press Next button.</p>
                        </div>
                        <textarea
                            value={output}
                            onChange={(e) => setOutput(e.target.value)}
                            placeholder="Paste output here"
                            className="w-full h-[60px] bg-[#1C1840] border border-[#00AEB9] rounded-[7px] px-6 py-4 text-white text-center font-family-sora text-[18px] placeholder:text-[#B0B0B0] placeholder:text-center placeholder:font-family-sora resize-none focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center items-center gap-4 mt-8">
                {showBackButton && (
                    <button
                        onClick={onBack}
                        className="bg-[#272E50] text-white rounded-[33px] text-center text-[13px] font-family-sora font-bold px-[50px] py-[12px] hover:opacity-90 transition-opacity duration-300"
                    >
                        GO BACK
                    </button>
                )}
                <button
                    onClick={onNext}
                    className="bg-[#3CDD22] rounded-[33px] text-center text-[13px] text-white font-family-sora font-bold px-[50px] py-[12px] hover:opacity-90 transition-opacity duration-300"
                >
                    NEXT
                </button>
            </div>
        </div>
    );
};

interface Step4Props {
    onBack: () => void;
    onNext: () => void;
    output: string;
    setOutput: (value: string) => void;
    showBackButton?: boolean;
}

const Step4 = ({ onBack, onNext, output, setOutput, showBackButton = true }: Step4Props) => {
    const commandLines = [
        "protx register_submit",
        "gdjoiwjdoiwjicervomhfnumny76gr5ffhbrelwpfokokfpoerkfkefr6rgrg4596eg9vewfrefgeriepoem",
        "epokroepkepokeprkpekgoreg509454095405tgtb^E",
        "$tSgtgvbvjnweaaaadesskowm54o565r1f6e1e6r1fe6v1e6rv15trvtrv6rt6trtrttrtgtmirmvovrotmrotm",
        "omttg56trt5gr6gv6rb5ujm1l6mn6fv6sc16a68e"
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(commandLines.join(" "));
    };

    return (
        <div className='w-full max-w-[913px] h-full rounded-[27px] border-1 border-[#00AEB9] bg-[#1C1840] pb-[48px]'>
            <div className="w-full flex flex-col justify-center items-center gap-[30px] px-[40px] py-[33px]">
                <StepIndicator currentStep={4} />
            </div>

            <div className="w-full px-[85px]">
                <h2 className="text-white text-2xl font-family-sora font-semibold mb-8 text-left">Sign The ProRegTx Transaction</h2>

                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-family-sora font-semibold">1.</span>
                            <p className="text-white font-family-sora">Paste the following command to the Debug console and press Enter.</p>
                        </div>
                        <div className="flex flex-col text-[#00AEB9] font-mono text-sm">
                            {commandLines.map((line, index) => (
                                <div key={index} className="flex flex-wrap items-center">
                                    <span className="break-all overflow-wrap-anywhere w-full md:w-auto">{line}</span>
                                    {index === commandLines.length - 1 && (
                                        <button
                                            onClick={handleCopy}
                                            className="mt-2 md:mt-0 md:ml-4 inline-flex items-center gap-2 px-4 rounded-full border border-[#EC008C] text-[#EC008C] hover:opacity-80 transition-opacity"
                                        >
                                            Copy
                                            <Image
                                                src="/nodedetail/copy-icon.svg"
                                                alt= "copy-icon"
                                                width={16}
                                                height={16}
                                                className="w-[16px] h-[16px]"
                                            />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-family-sora font-semibold">2.</span>
                            <p className="text-white font-family-sora">Paste the output here and press Next button.</p>
                        </div>
                        <textarea
                            value={output}
                            onChange={(e) => setOutput(e.target.value)}
                            placeholder="Paste output here"
                            className="w-full h-[60px] bg-[#1C1840] border border-[#00AEB9] rounded-[7px] px-6 py-4 text-white text-center font-family-sora text-[18px] placeholder:text-[#B0B0B0] placeholder:text-center placeholder:font-family-sora resize-none focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center items-center gap-4 mt-8">
                {showBackButton && (
                    <button
                        onClick={onBack}
                        className="bg-[#272E50] text-white rounded-[33px] text-center text-[13px] font-family-sora font-bold px-[50px] py-[12px] hover:opacity-90 transition-opacity duration-300"
                    >
                        GO BACK
                    </button>
                )}
                <button
                    onClick={onNext}
                    className="bg-[#3CDD22] rounded-[33px] text-center text-[13px] text-white font-family-sora font-bold px-[50px] py-[12px] hover:opacity-90 transition-opacity duration-300"
                >
                    NEXT
                </button>
            </div>
        </div>
    );
};

interface Step5Props {
    onBack: () => void;
    onNext: () => void;
    output: string;
    setOutput: (value: string) => void;
    onDeploy: () => Promise<void>;
    showBackButton?: boolean;
}

const Step5 = ({ onBack, onNext, output, setOutput, onDeploy, showBackButton = true }: Step5Props) => {
    const commandLines = [
        "protx register_submit",
        "gdjoiwjdoiwjicervomhfnumny76gr5ffhbrelwpfokokfpoerkfkefr6rgrg4596eg9vewfrefgeriepoem",
        "epokroepkepokeprkpekgoreg509454095405tgtb^E",
        "$tSgtgvbvjnweaaaadesskowm54o565r1f6e1e6r1fe6v1e6rv15trvtrv6rt6trtrttrtgtmirmvovrotmrotm",
        "omttg56trt5gr6gv6rb5ujm1l6mn6fv6sc16a68e"
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(commandLines.join(" "));
    };

    return (
        <div className='w-full max-w-[913px] h-full rounded-[27px] border-1 border-[#00AEB9] bg-[#1C1840] pb-[48px]'>
            <div className="w-full flex flex-col justify-center items-center gap-[30px] px-[40px] py-[33px]">
                <StepIndicator currentStep={5} />
            </div>

            <div className="w-full px-[85px]">
                <h2 className="text-white text-2xl font-family-sora font-semibold mb-8 text-left">ProTx Register_Submit</h2>

                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-family-sora font-semibold">1.</span>
                            <p className="text-white font-family-sora">Paste the following command to the Debug console and press Enter.</p>
                        </div>
                        <div className="flex flex-col text-[#00AEB9] font-mono text-sm">
                            {commandLines.map((line, index) => (
                                <div key={index} className="flex flex-wrap items-center">
                                    <span className="break-all overflow-wrap-anywhere w-full md:w-auto">{line}</span>
                                    {index === commandLines.length - 1 && (
                                        <button
                                            onClick={handleCopy}
                                            className="mt-2 md:mt-0 md:ml-4 inline-flex items-center gap-2 px-4 rounded-full border border-[#EC008C] text-[#EC008C] hover:opacity-80 transition-opacity"
                                        >
                                            Copy
                                            <Image
                                                src="/nodedetail/copy-icon.svg"
                                                alt= "copy-icon"
                                                width={16}
                                                height={16}
                                                className="w-[16px] h-[16px]"
                                            />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-family-sora font-semibold">2.</span>
                            <p className="text-white font-family-sora">Paste the output here and press Deploy.</p>
                        </div>
                        <textarea
                            value={output}
                            onChange={(e) => setOutput(e.target.value)}
                            placeholder="Paste output here"
                            className="w-full h-[60px] bg-[#1C1840] border border-[#00AEB9] rounded-[7px] px-6 py-4 text-white text-center font-family-sora text-[18px] placeholder:text-[#B0B0B0] placeholder:text-center placeholder:font-family-sora resize-none focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center items-center gap-4 mt-8">
                {showBackButton && (
                    <button
                        onClick={onBack}
                        className="bg-[#272E50] text-white rounded-[33px] text-center text-[13px] font-family-sora font-bold px-[50px] py-[12px] hover:opacity-90 transition-opacity duration-300"
                    >
                        GO BACK
                    </button>
                )}
                <button
                    onClick={onDeploy}
                    className="bg-[#3CDD22] rounded-[33px] text-center text-[13px] text-white font-family-sora font-bold px-[50px] py-[12px] hover:opacity-90 transition-opacity duration-300"
                >
                    DEPLOY
                </button>
            </div>
        </div>
    );
};

interface SuccessStepProps {
    onDashboard: () => void;
    onClose?: () => void;
}

const SuccessStep = ({ onDashboard, onClose }: SuccessStepProps) => (
    <div className='w-full max-w-[913px] h-full rounded-[27px] border-1 border-[#00AEB9] bg-[#1C1840] pb-[48px] relative'>
        {onClose && (
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-[#00AEB9] hover:opacity-80"
            >
                <Image
                    src="/nodedetail/close-icon.svg"
                    alt="close"
                    width={24}
                    height={24}
                />
            </button>
        )}
        <div className="w-full flex flex-col justify-center items-center px-[20px] pt-[33px]">
            <h1 className="text-white text-4xl font-family-sora font-bold mb-[10px]">Congratulations</h1>
            <div className="w-full h-[2.5px] bg-gradient-to-r from-[#221E45] via-[#00AEB9] to-[#221E45] mb-[20px]" />

            <p className="text-white text-xl font-family-sora text-center">
                Setup complete!<br />
                Your Smartnode is now being deployed to the network.<br />
                You can monitor your Smartnode through your Dashboard.
            </p>
            <button
                onClick={onDashboard}
                className="bg-[#3CDD22] rounded-[33px] text-center text-[13px] text-white font-family-sora font-bold px-[50px] py-[12px] hover:opacity-90 transition-opacity duration-300 mt-4"
            >
                DASHBOARD
            </button>
        </div>
    </div>
);

interface SmartNodesSetUpProps {
    initialStep?: number;
    onClose?: () => void;
}

export default function SmartNodesSetUp({ initialStep = 1, onClose }: SmartNodesSetUpProps) {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [transactionId, setTransactionId] = useState("");
    const [addresses, setAddresses] = useState({
        owner: "",
        voting: "",
        payee: "",
        feeSource: ""
    });
    const [output, setOutput] = useState("");
    const [step4Output, setStep4Output] = useState("");
    const [step5Output, setStep5Output] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleDeploy = async () => {
        try {
            // Make your API call here
            // const response = await fetch('/api/smartnode/deploy', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         transactionId,
            //         addresses,
            //         outputs: {
            //             step3: output,
            //             step4: step4Output,
            //             step5: step5Output
            //         }
            //     })
            // });

            // if (!response.ok) {
            //     throw new Error('Deployment failed');
            // }

            // If successful, show success step
            setIsSuccess(true);
        } catch (error) {
            console.error('Deployment error:', error);
            // Handle error (you might want to show an error message to the user)
        }
    };

    const handleDashboard = () => {
        router.push('/dashboard');
    };

    if (isSuccess) {
        return (
            <main className="pt-6 pb-[230px]">
                <div className="w-full flex flex-col justify-center items-center text-center">
                <div className="w-full text-[30px] font-family-sora font-bold py-[20px]">SMARTNODE SETUP</div>
                <div className="w-full h-[2px] bg-gradient-to-r from-[#221E45] via-[#00AEB9] to-[#221E45] mb-[40px]" />
                    <SuccessStep onDashboard={handleDashboard} onClose={onClose} />
                </div>
            </main>
        );
    }

    return (
        <main className="pt-6 pb-[230px]">
            <div className="w-full flex flex-col justify-center items-center text-center">
                <div className="w-full text-[30px] font-family-sora font-bold py-[20px]">SMARTNODE SETUP</div>
                <div className="w-full h-[2px] bg-gradient-to-r from-[#221E45] via-[#00AEB9] to-[#221E45] mb-[40px]" />

                {currentStep === 1 && (
                    <Step1
                        onNext={handleNext}
                        transactionId={transactionId}
                        setTransactionId={setTransactionId}
                    />
                )}

                {currentStep === 2 && (
                    <Step2
                        onBack={handleBack}
                        onNext={handleNext}
                        addresses={addresses}
                        setAddresses={setAddresses}
                        showBackButton={currentStep !== initialStep}
                    />
                )}

                {currentStep === 3 && (
                    <Step3
                        onBack={handleBack}
                        onNext={handleNext}
                        output={output}
                        setOutput={setOutput}
                        showBackButton={currentStep !== initialStep}
                    />
                )}

                {currentStep === 4 && (
                    <Step4
                        onBack={handleBack}
                        onNext={handleNext}
                        output={step4Output}
                        setOutput={setStep4Output}
                        showBackButton={currentStep !== initialStep}
                    />
                )}

                {currentStep === 5 && (
                    <Step5
                        onBack={handleBack}
                        onNext={handleNext}
                        output={step5Output}
                        setOutput={setStep5Output}
                        onDeploy={handleDeploy}
                        showBackButton={currentStep !== initialStep}
                    />
                )}
            </div>
        </main>
    );
}
