"use client"

import Image from "next/image";
import { useState } from "react";

interface BillingItem {
    id: string;
    name: string;
    hostingPlan: string;
    expirationDate: string;
    plans: {
        duration: string;
        price: string;
    }[];
}

interface Transaction {
    id: string;
    type: string;
    description: string;
    amount: string;
    date: string;
}

const BillingItemCard = ({ 
    item, 
    index, 
    isChecked, 
    onCheckboxChange 
}: { 
    item: BillingItem; 
    index: number; 
    isChecked: boolean; 
    onCheckboxChange: (index: number) => void;
}) => {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    return (
        <div className="w-full h-[64px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[76px]">
            <div className="w-full h-full flex flex-row justify-between items-center bg-[#1C1840] rounded-[76px] 
            px-4 sm:pl-[70px]">
                <div className="w-[120px] sm:w-[220px] flex flex-row justify-start items-center">
                    <h1 className="text-[16px] sm:text-[18px] font-semibold text-white font-family-sora truncate">{item.name}</h1>
                </div>
                <div className="w-[100px] sm:w-[300px] flex flex-row justify-start items-center">
                    <h1 className="text-[16px] sm:text-[18px] font-semibold text-white font-family-sora">{item.hostingPlan}</h1>
                </div>
                <div className="hidden sm:flex w-[250px] flex-row justify-start items-center">
                    <h1 className="text-[18px] font-semibold text-white font-family-sora">{item.expirationDate}</h1>
                </div>
                <div className="flex-1 sm:flex-none sm:w-[300px] flex flex-row justify-between items-center gap-2">
                    <div className="flex flex-row justify-start items-center gap-[5px] sm:gap-[10px]">
                        {item.plans.map((plan) => (
                            <button
                                key={plan.duration}
                                onClick={() => setSelectedPlan(plan.duration)}
                                className={`w-[40px] sm:w-[50px] h-[28px] sm:h-[33px] flex items-center justify-center 
                                ${selectedPlan === plan.duration ? 'bg-[#00AEB9]' : 'bg-[#404768]'} 
                                rounded-[19px] text-white font-family-sora font-regular text-[12px] sm:text-[14px]
                                transition-colors duration-200 hover:opacity-90`}
                            >
                                {plan.duration}
                            </button>
                        ))}
                    </div>
                    <button className="w-[50px] sm:w-[60px] h-[28px] sm:h-[33px] bg-[#00AEB9] rounded-[19px] 
                    text-white font-family-sora font-regular text-[12px] sm:text-[14px] cursor-pointer
                    transition-colors duration-200 hover:bg-[#009DA6]">
                        PAY
                    </button>
                </div>
                <div className="w-[40px] sm:w-[100px] flex flex-row justify-center items-center">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onCheckboxChange(index)}
                        className="w-[15px] h-[15px] border-[1px] border-[#26FF3470] bg-[#1C1840] rounded-[3px] 
                        text-[#26FF34] focus:ring-[#26FF34] focus:ring-offset-0 focus:ring-1
                        cursor-pointer appearance-none checked:bg-[#1C1840] checked:border-[#26FF34]
                        relative before:content-[''] before:absolute before:inset-0 
                        before:opacity-0 before:transition-opacity checked:before:opacity-100
                        before:border-r-2 before:border-b-2 before:border-[#26FF34] before:rotate-45
                        before:left-[4px] before:top-[1px] before:w-[4px] before:h-[8px]"
                    />
                </div>
            </div>
        </div>
    );
};

const TransactionRow = ({ transaction }: { transaction: Transaction }) => (
    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <div className="w-full sm:w-[400px] flex flex-row justify-start items-start">
            <h1 className="text-[14px] sm:text-[18px] font-regular text-white font-family-sora truncate">{transaction.id}</h1>
        </div>
        <div className="w-full sm:w-[300px] flex flex-row justify-start items-center">
            <h1 className="text-[14px] sm:text-[18px] font-regular text-white font-family-sora">{transaction.type}</h1>
        </div>
        <div className="w-full sm:w-[250px] flex flex-row justify-start items-start">
            <h1 className="text-[14px] sm:text-[18px] font-regular text-white font-family-sora">{transaction.description}</h1>
        </div>
        <div className="w-full sm:w-[200px] flex flex-row justify-start items-start">
            <h1 className="text-[14px] sm:text-[18px] font-regular text-white font-family-sora">{transaction.amount}</h1>
        </div>
        <div className="w-full sm:w-[100px] flex flex-row justify-start items-start">
            <h1 className="text-[14px] sm:text-[18px] font-regular text-white font-family-sora">{transaction.date}</h1>
        </div>
    </div>
);

const SectionTitle = ({ title }: { title: string }) => (
    <h1 className="text-[24px] sm:text-[30px] font-bold text-white font-family-sora pb-[30px]">
        {title}
    </h1>
);

const Divider = () => (
    <div className="w-full">
        <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full" />
    </div>
);

export default function Billing() {
    const [checkboxes, setCheckboxes] = useState([false, false, false]);

    const billingItems: BillingItem[] = [
        {
            id: "1",
            name: "Georgel",
            hostingPlan: "6 Months",
            expirationDate: "23 Aug 2025",
            plans: [
                { duration: "1m", price: "1000" },
                { duration: "3m", price: "3000" },
                { duration: "6m", price: "5000" }
            ]
        },
        {
            id: "2",
            name: "Georgel",
            hostingPlan: "6 Months",
            expirationDate: "23 Aug 2025",
            plans: [
                { duration: "1m", price: "1000" },
                { duration: "3m", price: "3000" },
                { duration: "6m", price: "5000" }
            ]
        },
        {
            id: "3",
            name: "Georgel",
            hostingPlan: "6 Months",
            expirationDate: "23 Aug 2025",
            plans: [
                { duration: "1m", price: "1000" },
                { duration: "3m", price: "3000" },
                { duration: "6m", price: "5000" }
            ]
        }
        // Add more items as needed
    ];

    const transactions: Transaction[] = [
        {
            id: "dif24uni2i2i2u55bb90am53k4jnnklkn558c",
            type: "Shared Node",
            description: "3 Months Plan",
            amount: "5000 Neoxa",
            date: "10/07/24"
        },
        {
            id: "f24uni2i2i2u55bb90am53k4jnnklknkon54i",
            type: "Private Node",
            description: "6 Months Plan",
            amount: "40000 Neoxa",
            date: "10/07/24"
        }
    ];

    const handleSelectAll = () => {
        setCheckboxes(checkboxes.map(() => true));
    };

    const handleCheckboxChange = (index: number) => {
        setCheckboxes(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <div className="min-h-screen bg-[#080525] px-4 sm:px-[50px] lg:px-[100px] pt-[60px] sm:pt-[120px]">
            <div className="w-full flex flex-col justify-center items-start">
                <SectionTitle title="Billing" />
                
                {/* Billing Items Section */}
                <div className="w-full flex flex-col justify-center items-start pb-[40px] sm:pb-[270px]">
                    {/* Header */}
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 pl-4 sm:pl-[70px] pb-[20px]">
                        <div className="w-full sm:w-[220px] flex flex-row justify-start items-start">
                            <h1 className="text-[16px] sm:text-[18px] font-semibold text-white font-family-sora">Name</h1>
                        </div>
                        <div className="w-full sm:w-[300px] flex flex-row justify-start items-center">
                            <h1 className="text-[16px] sm:text-[18px] font-semibold text-white font-family-sora">Hosting Plan</h1>
                        </div>
                        <div className="hidden sm:flex w-[250px] flex-row justify-start items-start">
                            <h1 className="text-[18px] font-semibold text-white font-family-sora">Expiration Date</h1>
                        </div>
                        <div className="w-full sm:w-[300px] flex flex-row justify-start items-start">
                            <h1 className="text-[16px] sm:text-[18px] font-semibold text-white font-family-sora">New Hosting Plan</h1>
                        </div>
                        <div className="w-full sm:w-[100px] flex flex-row justify-start items-start cursor-pointer" onClick={handleSelectAll}>
                            <h1 className="text-[16px] sm:text-[18px] font-semibold text-white font-family-sora">Select All</h1>
                        </div>
                    </div>

                    {/* Billing Items */}
                    <div className="w-full flex flex-col justify-between items-start gap-[20px] sm:gap-[40px]">
                        {billingItems.map((item, index) => (
                            <BillingItemCard
                                key={item.id}
                                item={item}
                                index={index}
                                isChecked={checkboxes[index]}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        ))}
                    </div>
                </div>

                <Divider />

                {/* Billing History Section */}
                <div className="w-full flex flex-col justify-center items-start pb-[40px] sm:pb-[400px]">
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 pt-[40px] sm:pt-[80px] pb-[30px] sm:pb-[70px]">
                        <SectionTitle title="Billing History" />
                        <button className="w-full sm:w-[230px] h-[48px] sm:h-[56px] flex items-center justify-center bg-[#404768] 
                        text-white text-[16px] sm:text-[18px] font-family-sora font-semibold rounded-[25px] cursor-pointer
                        transition-colors duration-200 hover:bg-[#4F5A7F]">
                            Export Billing History
                        </button>
                    </div>

                    {/* Transaction Headers */}
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
                        <div className="w-full sm:w-[400px] flex flex-row justify-start items-start">
                            <h1 className="text-[18px] sm:text-[24px] font-bold text-white font-family-sora">Transaction ID</h1>
                        </div>
                        <div className="w-full sm:w-[300px] flex flex-row justify-start items-center">
                            <h1 className="text-[18px] sm:text-[24px] font-bold text-white font-family-sora">Type</h1>
                        </div>
                        <div className="w-full sm:w-[250px] flex flex-row justify-start items-start">
                            <h1 className="text-[18px] sm:text-[24px] font-bold text-white font-family-sora">Description</h1>
                        </div>
                        <div className="w-full sm:w-[200px] flex flex-row justify-start items-start">
                            <h1 className="text-[18px] sm:text-[24px] font-bold text-white font-family-sora">Amount</h1>
                        </div>
                        <div className="w-full sm:w-[100px] flex flex-row justify-start items-start">
                            <h1 className="text-[18px] sm:text-[24px] font-bold text-white font-family-sora">Date</h1>
                        </div>
                    </div>

                    {/* Transaction Rows */}
                    <div className="w-full flex flex-col justify-center items-start gap-[20px]">
                        {transactions.map((transaction, index) => (
                            <TransactionRow key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
