import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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
    <div className="w-full min-h-[24px] flex flex-row justify-between items-start sm:items-center gap-1 sm:gap-[15px]">
        <label className="w-[150px] font-family-sora font-semibold text-white text-[12px]">{label}:</label>
        <div className="flex-1 flex items-center gap-2">
            <input 
                type="text" 
                value={value}
                readOnly={!isEditable}
                onChange={(e) => onChange?.(e.target.value)}
                className="flex-1 font-family-sora font-regular text-white text-[12px] bg-[#102644] 
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
    <div className="w-full sm:w-[210px] frame-border rounded-[22px]">
        <div className="w-full h-full frame-body rounded-[22px]
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
    <div className="w-full flex flex-row gap-4">
        <div className="w-1/4 md:hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 pb-[15px] md:pb-[30px]">
            <div className="w-full md:min-w-[475px] flex flex-col md:flex-row items-start md:items-center gap-1">
                {/* <span className="text-[12px] font-family-sora font-bold text-white">Transaction:</span> */}
                <span className="text-[12px] font-family-sora font-light text-white truncate">Transaction</span>
            </div>
            <div className="w-full md:w-[120px] md:min-w-[100px] flex flex-col md:flex-row items-start md:items-center gap-1">
                {/* <span className="text-[12px] font-family-sora font-bold text-white">Block Height:</span> */}
                <span className="text-[12px] font-family-sora font-light text-white">Block Height</span>
            </div>
            <div className="w-full md:w-[70px] md:min-w-[58px] flex flex-col md:flex-row items-start md:items-center gap-1">
                {/* <span className="text-[12px] font-family-sora font-bold text-white">Amount:</span> */}
                <span className="text-[12px] font-family-sora font-light text-white">Amount</span>
            </div>
            <div className="w-full md:min-w-[170px] flex flex-col md:flex-row items-start md:items-center gap-1">
                {/* <span className="text-[12px] font-family-sora font-bold text-white">Date:</span> */}
                <span className="text-[12px] font-family-sora font-light text-white">Date</span>
            </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 pb-[15px] md:pb-[30px]">
            <div className="w-full md:min-w-[475px] flex flex-col md:flex-row items-start md:items-center justify-center gap-1">
                {/* <span className="text-[12px] font-family-sora font-bold text-white">Transaction:</span> */}
                <span className="text-[12px] font-family-sora font-light text-white truncate">{transaction}</span>
            </div>
            <div className="w-full md:w-[120px] md:min-w-[100px] flex flex-col md:flex-row items-start md:items-center justify-center gap-1">
                {/* <span className="text-[12px] font-family-sora font-bold text-white">Block Height:</span> */}
                <span className="text-[12px] font-family-sora font-light text-white">{blockHeight}</span>
            </div>
            <div className="w-full md:w-[80px] md:min-w-[80px] flex flex-col md:flex-row items-start md:items-center justify-center gap-1">
                {/* <span className="text-[12px] font-family-sora font-bold text-white">Amount:</span> */}
                <span className="text-[12px] font-family-sora font-light text-white">{amount}</span>
            </div>
            <div className="w-full md:min-w-[120px] flex flex-col md:flex-row items-start md:items-center justify-center gap-1">
                {/* <span className="text-[12px] font-family-sora font-bold text-white">Date:</span> */}
                <span className="text-[12px] font-family-sora font-light text-white">{date}</span>
            </div>
        </div>
    </div>
);

interface WarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const WarningModal = ({ isOpen, onClose, onConfirm }: WarningModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div 
                ref={modalRef}
                className="w-full max-w-[600px] mx-4 rounded-[27px] border-1 border-[#00AEB9] bg-[#1C1840] p-8"
            >
                <h2 className="text-white text-4xl font-family-sora font-bold text-center mb-4">Warning</h2>
                
                <div className="w-full h-[2px] bg-gradient-to-r from-[#221E45] via-[#00AEB9] to-[#221E45] mb-8" />
                
                <div className="text-white text-xl font-family-sora text-center mb-8">
                    <p>Your Smartnode will be permanently</p>
                    <p>deleted and removed from the system.</p>
                    <p>Any remaining host duration is not</p>
                    <p>refundable.</p>
                    <p className="mt-4">Do you wish to proceed ?</p>
                </div>

                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="w-[120px] h-[40px] bg-[#00AEB9] rounded-[33px] text-white text-[13px] font-family-sora font-bold hover:opacity-90 transition-opacity"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onClose}
                        className="w-[120px] h-[40px] bg-[#A31704] rounded-[33px] text-white text-[13px] font-family-sora font-bold hover:opacity-90 transition-opacity"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

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
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

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

    const handleDeleteNode = () => {
        setIsWarningModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // Make API call to delete node
            // const response = await fetch('/api/smartnode/delete', {
            //     method: 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ nodeId: nodeData.id })
            // });

            // if (response.ok) {
            //     // Handle successful deletion
            //     setIsOpen(false);
            // }
            setIsWarningModalOpen(false);
            setIsOpen(false); // Close the detail modal after successful deletion
        } catch (error) {
            console.error('Error deleting node:', error);
            setIsWarningModalOpen(false);
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center p-2 sm:p-4">
            <div className="w-full max-w-[960px] border-[1px] border-[#00AEB9] bg-[#080525] rounded-[20px] 
            flex flex-col justify-start items-center px-3 sm:px-[65px] py-3 sm:py-[20px] my-4 sm:my-0 overflow-y-auto">
                {/* Header */}
                <div className="w-full flex flex-row justify-center items-center relative">
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
                <div className="w-full py-2 sm:py-4 mb-4 ">
                    <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full" />
                </div>

                {/* Main Content */}
                <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-8">
                    {/* Input Fields */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
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
                    <div className="w-full h-full lg:h-[370px] lg:w-1/3 flex flex-row lg:flex-col justify-center items-center gap-3 sm:gap-[30px] ">
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
                    <button 
                        onClick={handleDeleteNode}
                        className="w-full sm:w-[130px] h-[34px] bg-[#A31704] rounded-[36px] flex flex-row justify-center items-center font-family-sora font-semibold text-white text-[13px] cursor-pointer transition-colors duration-200 hover:bg-[#8A1403]"
                    >
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
                <div className="w-full h-[257px] lg:h-[257px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[26px] mt-[5px] mb-[35px ]">
                    <div className="w-full h-full bg-[#1C1840] flex flex-col justify-start items-center gap-4 md:gap-[10px] 
                    rounded-[26px] px-3 md:px-[25px] py-3 md:py-[20px] overflow-x-auto">
                        {/* Transaction Headers */}
                        <div className="w-full hidden md:flex flex-col md:flex-row justify-between items-center md:items-center gap-2 md:gap-0">
                            <div className="w-full md:min-w-[475px] flex flex-row justify-center items-center">
                                <span className="text-[14px] font-family-sora font-bold text-white">Transaction</span>
                            </div>
                            <div className="w-full md:w-[120px] md:min-w-[100px] flex flex-row justify-center items-center">
                                <span className="text-[14px] font-family-sora font-bold text-white">Block Height</span>
                            </div>
                            <div className="w-full md:w-[80px] md:min-w-[80px] flex flex-row justify-center items-center">
                                <span className="text-[14px] font-family-sora font-bold text-white">Amount</span>
                            </div>
                            <div className="w-full md:min-w-[120px] flex flex-row justify-center items-center">
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

            <WarningModal 
                isOpen={isWarningModalOpen}
                onClose={() => setIsWarningModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}
