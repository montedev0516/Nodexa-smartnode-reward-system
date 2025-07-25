"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { StatCard, StatusBadge } from "./PrivateNodesStatus"

interface SharedNodeStatusData {
    totalNodes: number;
    activeNodes: number;
    mySharedNodes: number;
    totalEarnings: number;
    collateralAmount: number;
    nodexaSmartNodes: number;
    lastUpdated?: Date;
}

const mockData: SharedNodeStatusData = {
    totalNodes: 2,
    activeNodes: 2,
    mySharedNodes: 2,
    totalEarnings: 120000,
    collateralAmount: 500000,
    nodexaSmartNodes: 55,
    lastUpdated: new Date()
};

export default function SharedNodesStatus() {
    const [data, setData] = useState<SharedNodeStatusData>(mockData);
    const [isLoading, setIsLoading] = useState(false);
    const isAllActive = data.activeNodes === data.totalNodes;

    const handleRefresh = async () => {
        try {
            setIsLoading(true);
            // TODO: Implement API call to fetch updated data
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
            
            // Simulate data update
            setData(prev => ({
                ...prev,
                lastUpdated: new Date()
            }));
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-refresh every 5 minutes
    useEffect(() => {
        const interval = setInterval(handleRefresh, 300000);
        return () => clearInterval(interval);
    }, []);

    // const formatLastUpdated = (date?: Date) => {
    //     if (!date) return '';
    //     const now = new Date();
    //     const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
        
    //     if (diff < 60) return 'Just now';
    //     if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    //     if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    //     return `${Math.floor(diff / 86400)}d ago`;
    // };

    return (
        <div className="w-full flex flex-col lg:flex-row justify-between items-stretch 
        lg:items-center gap-[30px] lg:gap-[16px] p-[0px] py-[15px] xl:px-[34px] 2xl:px-[100px]">
            {/* Main Status Card */}
            <div className="flex flex-col justify-center items-center w-full lg:w-[287px] p-[1px] frame-border rounded-[32px] h-[196px]">
                <div className="w-full h-full flex flex-col justify-between items-center frame-body rounded-[32px] py-[21px] gap-[8px]">
                    <div className="font-family-sora font-semibold text-white text-[18px] sm:text-[20px] md:text-[24px] text-center">
                            Shared Nodes
                    </div>
                    <div className="font-family-sora font-regular text-white text-[18px] sm:text-[20px] md:text-[24px] text-center pb-[3px]">
                        {data.activeNodes}/{data.totalNodes}
                    </div>
                    <StatusBadge isAllActive={isAllActive} />
                </div>
                <button 
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="absolute top-2 right-2 p-2 rounded-full bg-[#1C1840] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#252525]"
                >
                    <Image 
                        src="/dashboard/refresh.svg" 
                        alt="refresh" 
                        width={16} 
                        height={16} 
                        className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
                    />
                </button>
            </div>

            {/* Stats Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row justify-between items-stretch gap-[16px]">
                {/* Left Column */}
                <div className="w-full flex flex-col justify-between items-center gap-[16px]">
                    <StatCard 
                        title="My Shared Nodes" 
                        value={data.mySharedNodes.toString().padStart(2, '0')}
                        onClick={handleRefresh}
                    />
                    <StatCard 
                        title="My Total Earnings" 
                        value={data.totalEarnings}
                        showCoin={true}
                        onClick={handleRefresh}
                    />
                </div>

                {/* Right Column */}
                <div className="w-full flex flex-col justify-between items-center gap-[16px]">
                    <StatCard 
                        title="Collateral In Shared Nodes" 
                        value={data.collateralAmount}
                        showCoin={true}
                        onClick={handleRefresh}
                    />
                    <StatCard 
                        title="Nodexa Smartnodes" 
                        value={data.nodexaSmartNodes}
                        onClick={handleRefresh}
                    />
                </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1EC0CA]"></div>
                </div>
            )}
        </div>
    );
}
