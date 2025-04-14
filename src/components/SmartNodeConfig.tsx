import Image from "next/image";
import { useState } from "react";
import SmartNodesSetUp from "./SmartNodesSetUp";

interface SmartNodeConfigProps {
    onClose: () => void;
    onBack: () => void;
}

interface AddressInputProps {
    label: string;
    value: string;
    description: string;
    onChange: (value: string) => void;
    onCopy: () => void;
}

const AddressInput = ({ label, value, description, onChange, onCopy }: AddressInputProps) => (
    <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <label className="text-white text-lg font-family-sora font-semibold">{label}</label>
        </div>
        <p className="text-[#B0B0B0] text-sm font-family-sora">{description}</p>
        <div className="flex gap-2">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 bg-[#1C1840] border border-[#00AEB9] rounded-lg px-4 py-3 text-white font-family-sora text-sm"
                placeholder="Paste address here"
            />
            <button
                onClick={onCopy}
                className="flex items-center justify-center w-10 h-10 border border-[#00AEB9] rounded-lg"
            >
                <Image
                    src="/nodedetail/copy-icon.svg"
                    alt="copy"
                    width={16}
                    height={16}
                />
            </button>
        </div>
    </div>
);

const CommandSection = ({ title, description, command }: { title: string; description: string; command: string }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(command);
    };

    return (
        <div className="w-full bg-[#1C1840] border border-[#00AEB9] rounded-[20px] p-6">
            <h3 className="text-white text-xl font-family-sora font-semibold mb-4">{title}</h3>
            <p className="text-white text-sm font-family-sora mb-4">{description}</p>
            <div className="flex flex-col gap-2 text-[#00AEB9] font-mono text-sm w-4/5">
                <div className="relative">
                    <span className="inline break-all">{command}</span>
                    <button
                        onClick={handleCopy}
                        className="relative -top-[1px] inline-flex items-center gap-2 px-4 ml-2 rounded-full border border-[#EC008C] text-[#EC008C] hover:opacity-80 transition-opacity"
                    >
                        Copy
                        <Image
                            src="/nodedetail/copy-icon.svg"
                            alt="copy-icon"
                            width={16}
                            height={16}
                            className="w-[16px] h-[16px]"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function SmartNodeConfig({ onClose, onBack }: SmartNodeConfigProps) {
    const [addresses, setAddresses] = useState({
        owner: "4D%D4FH64JDGFGH046S02",
        voting: "HM%D4FH64JDGFGH046SHG",
        payee: "JJG%D4FH64JDGFGH046S0K",
        feeSource: "DD%D4FH64JDGFGH046S03"
    });

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center p-2 sm:p-4">
            <div className="w-full max-w-[960px] border-[1px] border-[#00AEB9] bg-[#080525] rounded-[20px] 
            flex flex-col justify-start items-center sm:px-[25px] py-3 sm:py-[20px] my-4 sm:my-0 overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="w-full flex flex-row justify-center items-center relative">
                    <h1 className="text-[20px] sm:text-[34px] font-family-sora font-bold text-white text-center">NODE CONFIGURATION</h1>
                    <button
                        onClick={onClose}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                    >
                        <Image
                            src="/nodedetail/close-icon.svg"
                            alt="close-icon"
                            width={16}
                            height={16}
                            className="w-[24px] sm:w-[52px] h-[24px] sm:h-[52px]"
                        />
                    </button>
                </div>

                {/* Divider */}
                <div className="w-full py-2 sm:py-4 mb-4">
                    <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full" />
                </div>

                <SmartNodesSetUp initialStep={2} />

                {/* Divider */}
                <div className="w-full py-[45px]">
                    <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full" />
                </div>

                {/* Command Sections */}
                <div className="w-full space-y-6 mb-8">
                    <CommandSection
                        title="ProTx Update_service"
                        description="A Provider Update Service Transaction is used to update information relating to the operator. An operator can update the IP address and port fields of a masternode."
                        command={`protx update_service 126482812e898e4d49f0b2dabe865bekhh6k5dd3fbf5f0450fb16925867bd38 85.190.243.76:8788 1741b72712716465ertt5cbb7e1af10344ce67882477e87f52146469e6d607be3b8 "" gxfqfTfmhcTJf1nwQi4J5Q97oFbqere41`}
                    />
                    <CommandSection
                        title="Protx Update_registrar"
                        description="A Provider Update Registrar Transaction is used to update information relating to the owner. An owner can update the operator's BLS public key, the voting address and the payee address."
                        command={`protx update_registrar 126482812e898e4d49f0b2dabe865bee8f38e8dd3fbf5f0450fb16925867bd38 0300dddf21e466f6753e5cvxcvv666nb7nnm sdf88SGog35ZR2EzA1jWXtDpApT21p5nB2 gxfqfTfmhcTJf1nwQi4J5Q97oFbqfghyt`}
                    />
                </div>

            </div>
        </div>
    );
} 