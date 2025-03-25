import Image from "next/image";
import { useState } from "react";

interface SmartNodeDetailProps {
    setIsOpen: (isOpen: boolean) => void;
}

interface InputFieldProps {
    label: string;
    value: string;
    onCopy?: () => void;
    onEdit?: () => void;
    isEditable?: boolean;
    onChange?: (value: string) => void;
}

const InputField = ({ label, value, onCopy, onEdit, isEditable = false, onChange }: InputFieldProps) => (
    <div className="w-full min-h-[24px] flex flex-col sm:flex-row sm:h-[24px] justify-between items-start sm:items-center gap-1 sm:gap-[15px] py-1 sm:py-0">
        <label className="w-full sm:w-[150px] font-family-sora font-semibold text-white text-[12px]">{label}:</label>
        <div className="w-full flex items-center gap-2">
            <input 
                type="text" 
                value={value}
                readOnly={!isEditable}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full font-family-sora font-regular text-white text-[12px] bg-[#102644] 
                border-[1px] border-[#00AEB9] rounded-[10px] px-[10px] py-[5px]" 
            />
            <button 
                onClick={isEditable ? onEdit : onCopy}
                className="w-[24px] sm:w-[27px] h-[24px] flex items-center justify-center cursor-pointer"
            >
                <Image 
                    src={isEditable ? "/nodedetail/pencil-icon.svg" : "/nodedetail/copy-icon.svg"} 
                    alt={isEditable ? "edit-icon" : "copy-icon"} 
                    width={16} 
                    height={16}
                    className="w-[16px] h-[16px]" 
                />
            </button>
        </div>
    </div>
);

const StatCard = ({ title, value, icon }: { title: string; value: string; icon?: string }) => (
    <div className="w-full sm:w-[210px] p-[1px] bg-gradient-to-b from-[#1EC0CA] to-[#1EC0CA16] rounded-[22px]">
        <div className="w-full h-full bg-gradient-to-b from-[#252525] to-[#0F0F0F] rounded-[22px]
        flex flex-col justify-center items-center gap-[10px] sm:gap-[20px] px-[15px] sm:px-[20px] py-[10px] sm:py-[15px]">
            <h1 className="font-family-sora font-semibold text-white text-[12px]">{title}</h1>
            <div className="flex flex-row justify-center items-center gap-[5px] sm:gap-[10px]">
                <h1 className="font-family-sora font-semibold text-white text-[12px]">{value}</h1>
                {icon && (
                    <Image 
                        src={icon} 
                        alt="icon" 
                        width={16} 
                        height={16}
                        className="w-[8px] sm:w-[10px] h-[8px] sm:h-[10px]" 
                    />
                )}
            </div>
        </div>
    </div>
);

const TransactionRow = ({ transaction, blockHeight, amount, date }: { 
    transaction: string; 
    blockHeight: string; 
    amount: string; 
    date: string; 
}) => (
    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 pb-[15px] sm:pb-[30px]">
        <div className="w-full sm:min-w-[475px] flex flex-col sm:flex-row items-start sm:items-center gap-1">
            {/* <span className="text-[12px] font-family-sora font-bold text-white">Transaction:</span> */}
            <span className="text-[12px] font-family-sora font-light text-white truncate">{transaction}</span>
        </div>
        <div className="w-full sm:w-[100px] sm:min-w-[92px] flex flex-col sm:flex-row items-start sm:items-center gap-1">
            {/* <span className="text-[12px] font-family-sora font-bold text-white">Block Height:</span> */}
            <span className="text-[12px] font-family-sora font-light text-white">{blockHeight}</span>
        </div>
        <div className="w-full sm:w-[70px] sm:min-w-[58px] flex flex-col sm:flex-row items-start sm:items-center gap-1">
            {/* <span className="text-[12px] font-family-sora font-bold text-white">Amount:</span> */}
            <span className="text-[12px] font-family-sora font-light text-white">{amount}</span>
        </div>
        <div className="w-full sm:min-w-[170px] flex flex-col sm:flex-row items-start sm:items-center gap-1">
            {/* <span className="text-[12px] font-family-sora font-bold text-white">Date:</span> */}
            <span className="text-[12px] font-family-sora font-light text-white">{date}</span>
        </div>
    </div>
);

export default function SmartNodeDetail({ setIsOpen }: SmartNodeDetailProps) {
    const [nodeData, setNodeData] = useState({
        name: "SmartNode 1",
        ip: "192.168.1.1",
        collateralAddress: "0x1234...5678",
        payeeAddress: "0x8765...4321",
        ownerAddress: "0xabcd...efgh",
        votingAddress: "0xijkl...mnop",
        feeAddress: "0xqrst...uvwx",
        txid: "0x1234...5678",
        protxHash: "0xabcd...efgh",
        blsPrivKey: "0xijkl...mnop",
        blsPubKey: "0xqrst...uvwx"
    });

    const handleCopy = (field: keyof typeof nodeData) => {
        navigator.clipboard.writeText(nodeData[field]);
        // Add toast notification here
    };

    const handleEdit = (field: keyof typeof nodeData) => {
        // Implement edit functionality
    };

    const handleInputChange = (field: keyof typeof nodeData, value: string) => {
        setNodeData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-2 sm:p-4">
            <div className="w-full max-w-[960px] h-[913px] border-[1px] border-[#00AEB9] bg-[#080525] rounded-[20px] 
            flex flex-col justify-start items-center px-3 sm:px-[65px] py-3 sm:py-[20px] my-4 sm:my-0">
                {/* Header */}
                <div className="w-full flex flex-row justify-center items-center relative mb-4">
                    <h1 className="text-[20px] sm:text-[34px] font-family-sora font-bold text-white text-center">SMARTNODE DETAILS</h1>
                    <button 
                        onClick={() => setIsOpen(false)}
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
                <div className="w-full py-2 sm:py-4">
                    <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full" />
                </div>

                {/* Main Content */}
                <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-8">
                    {/* Input Fields */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-2 sm:gap-3">
                        <InputField
                            label="Name"
                            value={nodeData.name}
                            onEdit={() => handleEdit('name')}
                            isEditable
                            onChange={(value) => handleInputChange('name', value)}
                        />
                        <InputField
                            label="Smartnode IP"
                            value={nodeData.ip}
                            onCopy={() => handleCopy('ip')}
                            onChange={(value) => handleInputChange('ip', value)}
                        />
                        <InputField
                            label="Colaterall Address"
                            value={nodeData.collateralAddress}
                            onCopy={() => handleCopy('collateralAddress')}
                            onChange={(value) => handleInputChange('collateralAddress', value)}
                        />
                        <InputField
                            label="Payee Address"
                            value={nodeData.payeeAddress}
                            onCopy={() => handleCopy('payeeAddress')}
                            onChange={(value) => handleInputChange('payeeAddress', value)}
                        />
                        <InputField
                            label="Owner Address"
                            value={nodeData.ownerAddress}
                            onCopy={() => handleCopy('ownerAddress')}
                            onChange={(value) => handleInputChange('ownerAddress', value)}
                        />
                        <InputField
                            label="Voting Address"
                            value={nodeData.votingAddress}
                            onCopy={() => handleCopy('votingAddress')}
                            onChange={(value) => handleInputChange('votingAddress', value)}
                        />
                        <InputField
                            label="Fee Address"
                            value={nodeData.feeAddress}
                            onCopy={() => handleCopy('feeAddress')}
                            onChange={(value) => handleInputChange('feeAddress', value)}
                        />
                        <InputField
                            label="TXID"
                            value={nodeData.txid}
                            onCopy={() => handleCopy('txid')}
                            onChange={(value) => handleInputChange('txid', value)}
                        />
                        <InputField
                            label="ProtxHash"
                            value={nodeData.protxHash}
                            onCopy={() => handleCopy('protxHash')}
                            onChange={(value) => handleInputChange('protxHash', value)}
                        />
                        <InputField
                            label="BLSPrivKey"
                            value={nodeData.blsPrivKey}
                            onCopy={() => handleCopy('blsPrivKey')}
                            onChange={(value) => handleInputChange('blsPrivKey', value)}
                        />
                        <InputField
                            label="BLSPubKey"
                            value={nodeData.blsPubKey}
                            onCopy={() => handleCopy('blsPubKey')}
                            onChange={(value) => handleInputChange('blsPubKey', value)}
                        />
                    </div>

                    {/* Stats Cards */}
                    <div className="w-full h-full lg:w-1/3 flex flex-row lg:flex-col justify-center items-center gap-3 sm:gap-[30px]">
                        <StatCard
                            title="Smartnode Worth"
                            value="$1080"
                        />
                        <StatCard
                            title="Total Earnings"
                            value="25000"
                            icon="/neoxa_button/neoxa-coin.svg"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-3 sm:gap-[15px] py-4">
                    <button className="w-full sm:w-[109px] h-[34px] bg-[#1EC0CA] rounded-[36px] font-family-sora font-semibold 
                    text-white text-[13px] cursor-pointer transition-colors duration-200 hover:bg-[#1AADB6]">
                        Configure
                    </button>
                    <button className="w-full sm:w-[130px] h-[34px] bg-[#A31704] rounded-[36px] flex flex-row justify-start items-center 
                    font-family-sora font-semibold text-white text-[13px] pl-[20px] cursor-pointer transition-colors duration-200 
                    hover:bg-[#8A1403]">
                        Delete Node
                        <Image 
                            src="/myaccount/trash-icon.svg" 
                            alt="trash-icon" 
                            width={16} 
                            height={16}
                            className="w-[16px] h-[16px] ml-2" 
                        />
                    </button>
                </div>

                {/* Transaction History */}
                <div className="w-full h-[200px] lg:h-[260px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[26px]">
                    <div className="w-full h-full bg-[#1C1840] flex flex-col justify-start items-center gap-4 sm:gap-[10px] 
                    rounded-[26px] px-3 sm:px-[25px] py-3 sm:py-[20px] overflow-x-auto">
                        {/* Transaction Headers */}
                        <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-center gap-2 sm:gap-0">
                            <div className="w-full sm:min-w-[475px] flex flex-row justify-center items-center">
                                <span className="text-[14px] font-family-sora font-bold text-white">Transaction</span>
                            </div>
                            <div className="w-full sm:w-[100px] sm:min-w-[92px] flex flex-row justify-center items-center">
                                <span className="text-[14px] font-family-sora font-bold text-white">Block Height</span>
                            </div>
                            <div className="w-full sm:w-[70px] sm:min-w-[58px] flex flex-row justify-center items-center">
                                <span className="text-[14px] font-family-sora font-bold text-white">Amount</span>
                            </div>
                            <div className="w-full sm:min-w-[170px] flex flex-row justify-center items-center">
                                <span className="text-[14px] font-family-sora font-bold text-white">Date</span>
                            </div>
                        </div>

                        {/* Transaction Rows */}
                        <TransactionRow
                            transaction="f05329431df969d3db079361790615ba6549ad5324k4haa184d4db1343438c94"
                            blockHeight="1118702"
                            amount="2250"
                            date="05/08/2025 02:10pm"
                        />
                        <TransactionRow
                            transaction="f05329431df969d3db079361790615ba6549ad5324k4haa184d4db1343438c94"
                            blockHeight="1118702"
                            amount="2250"
                            date="05/08/2025 02:10pm"
                        />
                        <TransactionRow
                            transaction="f05329431df969d3db079361790615ba6549ad5324k4haa184d4db1343438c94"
                            blockHeight="1118702"
                            amount="2250"
                            date="05/08/2025 02:10pm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
