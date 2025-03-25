"use client"
import Image from "next/image"
import { useState } from "react"

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: string;
    showCoin?: boolean;
    onClick?: () => void;
}

interface NodeStatusData {
    totalNodes: number;
    activeNodes: number;
    avgPaymentTime: string;
    smartnodesValue: number;
    activeSmartNodes: number;
    totalEarnings: number;
}

const mockData: NodeStatusData = {
    totalNodes: 8,
    activeNodes: 8,
    avgPaymentTime: "2D 6H 30M",
    smartnodesValue: 8000,
    activeSmartNodes: 2950,
    totalEarnings: 1420335
};

export const StatCard = ({ title, value, icon, showCoin = false, onClick }: StatCardProps) => (
    <div 
        className="w-full p-[1px] bg-gradient-to-b from-[#1EC0CA] to-[#1EC0CA16] rounded-[32px] transition-transform hover:scale-[1.02] cursor-pointer"
        onClick={onClick}
    >
        <div className="w-full h-full bg-gradient-to-t from-[#0F0F0F] to-[#252525] rounded-[32px] px-[20px] sm:px-[30px] md:px-[40px] lg:px-[60px] py-[11px]">
            <div className="font-family-sora font-regular text-white text-[14px] sm:text-[16px] md:text-[18px] text-center">{title}</div>
            <div className="flex flex-row justify-center items-center gap-[10px]">
                <div className="font-family-sora font-semibold text-white text-[14px] sm:text-[16px] md:text-[18px] text-center">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </div>
                {showCoin && (
                    <Image 
                        src="/neoxa_button/neoxa-coin.svg" 
                        alt="neoxa-coin" 
                        width={19} 
                        height={19} 
                        className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] md:w-[19px] md:h-[19px]" 
                    />
                )}
                {icon && (
                    <Image 
                        src={icon} 
                        alt="icon" 
                        width={16} 
                        height={16} 
                        className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] md:w-[16px] md:h-[16px]" 
                    />
                )}
            </div>
        </div>
    </div>
);

export const StatusBadge = ({ isAllActive }: { isAllActive: boolean }) => (
    <div 
        className={`flex flex-row justify-between items-center gap-[7px] border-[1px] px-[15px] py-[7px] rounded-[7px] transition-colors
            ${isAllActive ? 'border-[#26FF34] hover:bg-[#26FF3410]' : 'border-[#FF3426] hover:bg-[#FF342610]'}`}
    >
        <div className={`font-family-sora font-bold text-[14px] sm:text-[16px] ${isAllActive ? 'text-[#26FF34]' : 'text-[#FF3426]'}`}>
            {isAllActive ? 'All Active' : 'Some Inactive'}
        </div>
        <Image 
            src={isAllActive ? "/dashboard/button_vector.svg" : "/dashboard/warning.svg"} 
            alt="status_icon" 
            width={16} 
            height={16} 
            className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]" 
        />
    </div>
);

export default function PrivateNodesStatus() {
    const [data, setData] = useState<NodeStatusData>(mockData);
    const isAllActive = data.activeNodes === data.totalNodes;

    const handleRefresh = async () => {
        // TODO: Implement refresh logic
        console.log('Refreshing node status...');
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between items-stretch 
        lg:items-center gap-[30px] lg:gap-[10px] p-[15px] sm:p-[20px] xl:px-[40px] 2xl:px-[100px]">
            {/* Main Status Card */}
            <div className="w-full lg:w-auto p-[1px] bg-gradient-to-b from-[#1EC0CA] to-[#1EC0CA16] rounded-[32px]">
                <div className="h-full flex flex-col justify-between items-center bg-gradient-to-t from-[#0F0F0F] to-[#252525] rounded-[32px] px-[30px] sm:px-[40px] md:px-[57px] py-[21px]">
                    <div className="font-family-sora font-semibold text-white text-[18px] sm:text-[20px] md:text-[24px] text-center">Private Nodes</div>
                    <div className="font-family-sora font-regular text-white text-[18px] sm:text-[20px] md:text-[24px] text-center pb-[3px]">
                        {data.activeNodes}/{data.totalNodes}
                    </div>
                    <StatusBadge isAllActive={isAllActive} />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row justify-between items-stretch gap-[16px] 2xl:gap-[32px]">
                {/* Left Column */}
                <div className="flex flex-col justify-between items-center gap-[16px] lg:gap-[6px]">
                    <StatCard 
                        title="Avg Payment Time" 
                        value={data.avgPaymentTime}
                        onClick={handleRefresh}
                    />
                    <StatCard 
                        title="My Smartnodes Value" 
                        value={`$${data.smartnodesValue}`}
                        onClick={handleRefresh}
                    />
                </div>

                {/* Right Column */}
                <div className="flex flex-col justify-between items-center gap-[16px] lg:gap-[6px]">
                    <StatCard 
                        title="Active Smartnodes" 
                        value={data.activeSmartNodes}
                        onClick={handleRefresh}
                    />
                    <StatCard 
                        title="My Total Earnings" 
                        value={data.totalEarnings}
                        showCoin={true}
                        onClick={handleRefresh}
                    />
                </div>
            </div>
        </div>
    )
}
