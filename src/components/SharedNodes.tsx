"use client"
import Image from "next/image"
import { useState, useEffect } from "react"

interface SharedNodeData {
    id: number;
    nodeNumber: number;
    status: 'Active' | 'Inactive';
    poseScore: number;
    nodeAddress: string;
    nodeIP: string;
    rewards: number;
    nextPayIn: string;
    participants: number;
    myCollateral: number;
    myRewards: number;
    hostingPlan: string;
    endsIn: string;
}

const mockNodes: SharedNodeData[] = [
    {
        id: 1,
        nodeNumber: 56,
        status: 'Active',
        poseScore: 0,
        nodeAddress: 'Fhi43n4n5o6icd4min4k33',
        nodeIP: '15.25.111.25.11:8788',
        rewards: 202260,
        nextPayIn: '8 Hrs Left',
        participants: 3,
        myCollateral: 300000,
        myRewards: 50000,
        hostingPlan: '6 Months',
        endsIn: 'Dd/Hh/Mm'
    },
    {
        id: 2,
        nodeNumber: 56,
        status: 'Active',
        poseScore: 0,
        nodeAddress: 'Fhi43n4n5o6icd4min4k33',
        nodeIP: '15.25.111.25.11:8788',
        rewards: 202260,
        nextPayIn: '8 Hrs Left',
        participants: 3,
        myCollateral: 300000,
        myRewards: 50000,
        hostingPlan: '6 Months',
        endsIn: 'Dd/Hh/Mm'
    },
    {
        id: 3,
        nodeNumber: 56,
        status: 'Active',
        poseScore: 0,
        nodeAddress: 'Fhi43n4n5o6icd4min4k33',
        nodeIP: '15.25.111.25.11:8788',
        rewards: 202260,
        nextPayIn: '8 Hrs Left',
        participants: 3,
        myCollateral: 300000,
        myRewards: 50000,
        hostingPlan: '6 Months',
        endsIn: 'Dd/Hh/Mm'
    },
    // Add more mock data as needed
];

const NodeInfoItem = ({ 
    title, 
    value, 
    showCoin = false, 
    width = "150px",
    isMobile = false 
}: {
    title: string;
    value: string | number;
    showCoin?: boolean;
    width?: string;
    isMobile?: boolean;
}) => (
    <div className={`
        ${isMobile ? 'w-full px-4' : `w-[${width}]`}
        h-full flex ${isMobile ? 'flex-row justify-between' : 'flex-col justify-center'} 
        items-center
    `}>
        <div className={`
            flex justify-center items-center text-white 
            ${isMobile ? 'text-[14px]' : 'text-[18px]'} 
            font-family-sora font-semibold
        `}>
            {title}
        </div>
        <div className="flex flex-row justify-center items-center gap-[8px]">
            <div className={`
                text-grey-500 
                ${isMobile ? 'text-[14px]' : 'text-[16px]'} 
                font-family-sora font-normal
            `}>
                {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            {showCoin && (
                <Image 
                    src="/neoxa_button/neoxa-coin.svg" 
                    alt="neoxa-coin" 
                    width={isMobile ? 16 : 22} 
                    height={isMobile ? 16 : 22} 
                    className={`${isMobile ? 'w-4 h-4' : 'w-[22px] h-[22px]'}`} 
                />
            )}
        </div>
    </div>
);

const MobileNodeInfo = ({ node }: { node: SharedNodeData }) => (
    <div className="w-full space-y-3 py-4">
        <NodeInfoItem title="Status" value={node.status} isMobile />
        <NodeInfoItem title="Pose Score" value={node.poseScore} isMobile />
        <NodeInfoItem title="Node Address" value={node.nodeAddress} isMobile />
        <NodeInfoItem title="Node IP" value={node.nodeIP} isMobile />
        <NodeInfoItem title="Rewards" value={node.rewards} showCoin isMobile />
        <NodeInfoItem title="Next Pay" value={node.nextPayIn} isMobile />
        <NodeInfoItem title="Participants" value={node.participants} isMobile />
        <NodeInfoItem title="My Collateral" value={node.myCollateral} showCoin isMobile />
        <NodeInfoItem title="My Rewards" value={node.myRewards} isMobile />
        <NodeInfoItem title="Hosting Plan" value={node.hostingPlan} isMobile />
        <NodeInfoItem title="Ends In" value={node.endsIn} isMobile />
    </div>
);

const SharedNodeCard = ({ node, isLoading = false }: { node: SharedNodeData; isLoading?: boolean }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[20px] 
        xl:rounded-[76px] transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
            <div className={`
                w-full bg-[#1C1840] rounded-[20px] xl:rounded-[76px] 
                flex flex-col justify-between items-center px-[30px] relative 
                ${isLoading ? 'opacity-50' : ''}
                overflow-hidden
            `}>
                {/* Desktop View */}
                <div className="hidden xl:flex w-full flex-col justify-between items-center gap-[26px] px-[50px] py-[25px]">
                    {/* Top Row */}
                    <div className="w-full h-[70px] flex flex-row justify-between items-center">
                        <div className="w-[60px] h-full flex justify-start items-center">
                            <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#EC008C] rounded-full 
                            text-white text-[18px] font-family-sora font-bold">
                                {node.nodeNumber}
                            </div>
                        </div>
                        <NodeInfoItem title="Status" value={node.status} />
                        <NodeInfoItem title="Pose Score" value={node.poseScore} width="170px" />
                        <NodeInfoItem title="Node Address" value={node.nodeAddress} width="250px" />
                        <NodeInfoItem title="Node IP" value={node.nodeIP} width="180px" />
                        <NodeInfoItem title="Rewards" value={node.rewards} showCoin width="150px" />
                        <NodeInfoItem title="Next Pay" value={node.nextPayIn} />
                    </div>

                    {/* Bottom Row */}
                    <div className="w-full h-[70px] flex flex-row justify-between items-center">
                        <div className="w-[60px]" />
                        <NodeInfoItem title="Participants" value={node.participants} />
                        <NodeInfoItem title="My Collateral" value={node.myCollateral} showCoin width="170px" />
                        <NodeInfoItem title="My Rewards" value={node.myRewards} width="250px" />
                        <NodeInfoItem title="Hosting Plan" value={node.hostingPlan} width="180px" />
                        <NodeInfoItem title="Ends In" value={node.endsIn} />
                        <div className="w-[150px]" />
                    </div>
                </div>

                {/* Mobile View */}
                <div className="xl:hidden w-full">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                            <div className="w-[32px] h-[32px] flex justify-center items-center bg-[#EC008C] rounded-full 
                            text-white text-[14px] font-family-sora font-bold">
                                {node.nodeNumber}
                            </div>
                            <div className="flex flex-col">
                                <div className="text-white text-[14px] font-family-sora font-semibold">
                                    Node {node.nodeNumber}
                                </div>
                                <div className="text-grey-500 text-[12px]">
                                    {node.status}
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 hover:bg-white/5 rounded-full transition-colors"
                        >
                            {isExpanded ? (
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {isExpanded && <MobileNodeInfo node={node} />}
                </div>

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#EC008C]" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default function SharedNodes() {
    const [nodes, setNodes] = useState<SharedNodeData[]>(mockNodes);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNodes = async () => {
        try {
            setIsLoading(true);
            setError(null);
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setNodes(mockNodes);
        } catch (err) {
            setError('Failed to fetch nodes. Please try again later.');
            console.error('Error fetching nodes:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNodes();
    }, []);

    return (
        <div className="w-full flex flex-col justify-center items-center gap-[20px] 
        md:gap-[40px] pt-[60px] md:pt-[120px] pb-[100px] md:pb-[200px] px-4 sm:px-6 lg:px-8">
            {error && (
                <div className="w-full max-w-3xl bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500 text-center text-sm md:text-base">
                    {error}
                </div>
            )}
            
            {nodes.map(node => (
                <SharedNodeCard 
                    key={node.id} 
                    node={node} 
                    isLoading={isLoading} 
                />
            ))}

            {nodes.length === 0 && !isLoading && !error && (
                <div className="text-gray-400 text-center text-sm md:text-base">
                    No shared nodes found.
                </div>
            )}

            {/* <button
                onClick={fetchNodes}
                disabled={isLoading}
                className="mt-4 px-4 md:px-6 py-2 bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-full text-white font-family-sora font-semibold text-sm md:text-base hover:opacity-90 disabled:opacity-50 transition-all duration-300"
            >
                {isLoading ? 'Refreshing...' : 'Refresh Nodes'}
            </button> */}
        </div>
    );
}
