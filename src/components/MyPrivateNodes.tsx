"use client"
import Image from "next/image"
import { useState, useRef } from "react"
import SmartNodeDetail from "./SmartNodeDetail"
import { StatusComponent } from "./StatusComponent";

interface NodeData {
    id: string;
    name: string;
    status: string;
    poseScore: number | 'Pose Banned';
    nodeIp: string;
    rewards: number;
    nextPay: string | '-';
    hostingPlan: string;
    expirationDate: string;
}

interface ColumnHeader {
    key: keyof NodeData;
    label: string;
    width: string;
    align?: 'start' | 'center';
}

const columnHeaders: ColumnHeader[] = [
    { key: 'name', label: 'Name', width: 'w-[70px]' },
    { key: 'status', label: 'Status', width: 'w-[100px]' },
    { key: 'poseScore', label: 'Pose Score', width: 'w-[100px]' },
    { key: 'nodeIp', label: 'Node IP', width: 'w-[150px]' },
    { key: 'rewards', label: 'Rewards', width: 'w-[120px]', align: 'center' },
    { key: 'nextPay', label: 'Next Pay', width: 'w-[90px]' },
    { key: 'hostingPlan', label: 'Hosting Plan', width: 'w-[110px]' },
    { key: 'expirationDate', label: 'Expiration Date', width: 'w-[140px]', align: 'center' },
];

const mockNodes: NodeData[] = [
    {
        id: '1',
        name: 'George',
        status: 'Online',
        poseScore: 0,
        nodeIp: '15.25.111.25.11:8788',
        rewards: 202260,
        nextPay: '8 Hrs Left',
        hostingPlan: '6 Months',
        expirationDate: '16 Jul 2024'
    },
    {
        id: '2',
        name: 'George',
        status: 'Syncing',
        poseScore: 2150,
        nodeIp: '15.16.150.55.11:8788',
        rewards: 20240,
        nextPay: '-',
        hostingPlan: '6 Months',
        expirationDate: '16 Sep 2024'
    },
    {
        id: '3',
        name: 'George',
        status: 'Offline',
        poseScore: 'Pose Banned',
        nodeIp: '15.30.125.25.11:8788',
        rewards: 12260,
        nextPay: '-',
        hostingPlan: '6 Months',
        expirationDate: '23 Aug 2024'
    },
    {
        id: '4',
        name: 'George',
        status: 'Online',
        poseScore: 0,
        nodeIp: '15.25.111.25.11:8788',
        rewards: 202260,
        nextPay: '8 Hrs Left',
        hostingPlan: '6 Months',
        expirationDate: '16 Jul 2024'
    },
    {
        id: '5',
        name: 'George',
        status: 'Syncing',
        poseScore: 2150,
        nodeIp: '15.16.150.55.11:8788',
        rewards: 20240,
        nextPay: '-',
        hostingPlan: '6 Months',
        expirationDate: '16 Sep 2024'
    },
    {
        id: '6',
        name: 'George',
        status: 'Offline',
        poseScore: 'Pose Banned',
        nodeIp: '15.30.125.25.11:8788',
        rewards: 12260,
        nextPay: '-',
        hostingPlan: '6 Months',
        expirationDate: '23 Aug 2024'
    }
];

const TableHeader = () => (
    <div className="hidden lg:flex w-full h-[56px] flex-row justify-between items-center gap-[20px] px-[20px] lg:px-[40px] py-[15px]">
        {columnHeaders.map((header) => (
            <div key={header.key} className={`${header.width} flex flex-row justify-${header.align || 'start'} items-center`}>
                <h1 className="font-family-sora font-semibold text-white text-[14px] md:text-[18px] text-center">{header.label}</h1>
            </div>
        ))}
        <div className="w-[75px] h-[33px]" />
    </div>
);

const NodeRow = ({ node, onDetailClick }: { node: NodeData; onDetailClick: () => void }) => {
    const handleRefresh = async () => {
        // TODO: Implement node refresh logic
        console.log('Refreshing node:', node.id);
    };

    // Mobile card view
    const MobileView = () => (
        <div className="w-full p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[20px] lg:hidden">
            <div className="w-full bg-[#1C1840] rounded-[20px] p-[15px]">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="font-family-sora text-white text-[16px] mb-1">{node.name}</h2>
                        <span className={`font-family-sora text-[14px] ${
                            node.status === 'Online' ? 'text-green-400' :
                            node.status === 'Syncing' ? 'text-yellow-400' : 'text-red-400'
                        }`}>{node.status}</span>
                    </div>
                    <button 
                        onClick={handleRefresh}
                        className="hover:opacity-70 transition-opacity"
                    >
                        <Image 
                            src="/dashboard/refresh.svg" 
                            alt="refresh" 
                            width={16} 
                            height={16} 
                        />
                    </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                        <p className="text-gray-400 text-[12px]">Pose Score</p>
                        <p className="text-white text-[14px]">{node.poseScore}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-[12px]">Node IP</p>
                        <p className="text-white text-[14px] break-all">{node.nodeIp}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-[12px]">Rewards</p>
                        <div className="flex items-center gap-2">
                            <span className="text-white text-[14px]">{node.rewards.toLocaleString()}</span>
                            <Image 
                                src="/neoxa_button/neoxa-coin.svg" 
                                alt="neoxa-coin" 
                                width={16} 
                                height={16} 
                            />
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 text-[12px]">Next Pay</p>
                        <p className="text-white text-[14px]">{node.nextPay}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-[12px]">Hosting Plan</p>
                        <p className="text-white text-[14px]">{node.hostingPlan}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-[12px]">Expiration</p>
                        <p className="text-white text-[14px]">{node.expirationDate}</p>
                    </div>
                </div>
                
                <button 
                    onClick={onDetailClick}
                    className="w-full bg-[#404768] rounded-[18px] py-2 text-white text-[14px] hover:opacity-70 transition-opacity"
                >
                    Details
                </button>
            </div>
        </div>
    );

    // Desktop row view
    const DesktopView = () => (
        <div className="hidden lg:block w-full h-[56px] p-[1px] bg-gradient-to-r from-[#EC008C] to-[#00AEB9] rounded-[76px]">
            <div className="w-full h-full bg-[#1C1840] rounded-[76px] flex flex-row justify-between items-center gap-[20px] px-[20px] lg:px-[40px] py-[15px]">
                <div className="w-[70px] flex flex-row justify-start items-center">
                    <h1 className="font-family-sora font-regular text-white text-[14px]">{node.name}</h1>
                </div>
                <div className="w-[100px] flex flex-row justify-start items-center gap-[10px]">
                    <StatusComponent status={node.status} />
                    <h1 className={`font-family-sora font-regular text-[14px] text-center ${
                        node.status === 'Online' ? 'text-green-400' :
                        node.status === 'Syncing' ? 'text-yellow-400' : 'text-red-400'
                    }`}>{node.status}</h1>
                </div>
                <div className="w-[100px] flex flex-row justify-start items-center">
                    <h1 className="font-family-sora font-regular text-white text-[14px] text-center">{node.poseScore}</h1>
                </div>
                <div className="w-[150px] flex flex-row justify-start items-center">
                    <h1 className="font-family-sora font-regular text-white text-[14px] text-center">{node.nodeIp}</h1>
                </div>
                <div className="w-[120px] flex flex-row justify-center items-center gap-[15px]">
                    <div className="font-family-sora font-regular text-white text-[14px] text-center">
                        {node.rewards.toLocaleString()}
                    </div>
                    <Image 
                        src="/neoxa_button/neoxa-coin.svg" 
                        alt="neoxa-coin" 
                        width={20} 
                        height={20} 
                        className="w-[20px] h-[20px]" 
                    />
                </div>
                <div className="w-[90px] flex flex-row justify-start items-center">
                    <h1 className="font-family-sora font-regular text-white text-[14px] text-center">{node.nextPay}</h1>
                </div>
                <div className="w-[110px] flex flex-row justify-start items-center">
                    <h1 className="font-family-sora font-regular text-white text-[14px] text-center">{node.hostingPlan}</h1>
                </div>
                <div className="w-[140px] flex flex-row justify-center items-center gap-[15px]">
                    <div className="font-family-sora font-regular text-white text-[14px] text-center">{node.expirationDate}</div>
                    <button 
                        className="hover:opacity-70 transition-opacity"
                        onClick={handleRefresh}
                    >
                        <Image 
                            src="/dashboard/refresh.svg" 
                            alt="refresh" 
                            width={16} 
                            height={16} 
                            className="w-[16px] h-[16px]" 
                        />
                    </button>
                </div>
                <div className="w-[75px] h-[33px] bg-[#404768] rounded-[18px] flex justify-center items-center">
                    <button 
                        onClick={onDetailClick}
                        className="font-family-sora font-regular text-white text-[14px] text-center cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <MobileView />
            <DesktopView />
        </>
    );
};

export default function MyPrivateNodes() {
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [nodes, setNodes] = useState<NodeData[]>(mockNodes);
    const detailButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleDetailClick = (nodeId: string) => {
        setSelectedNodeId(nodeId);
    };

    return (
        <div className="w-full flex flex-col justify-center items-center gap-[20px] lg:gap-[40px] px-[15px] lg:px-0 pt-[60px] lg:pt-[120px] pb-[100px] lg:pb-[200px]">
            <TableHeader />
            {nodes.map((node) => (
                <NodeRow 
                    key={node.id} 
                    node={node} 
                    onDetailClick={() => handleDetailClick(node.id)} 
                />
            ))}
            {selectedNodeId && (
                <SmartNodeDetail 
                    setIsOpen={() => setSelectedNodeId(null)} 
                />
            )}
        </div>
    );
}
