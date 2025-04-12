import { StatusComponent } from "./StatusComponent";

interface SharedNode {
    id: number;
    ip: string;
    poseScore: number;
    endsIn: string;
}

const sharedNodesData: SharedNode[] = [
    {
        id: 1,
        ip: "15.25.111.25.11:8788",
        poseScore: 1785,
        endsIn: "DD/HH/MM"
    },
    {
        id: 1,
        ip: "15.25.111.25.11:8788",
        poseScore: 1785,
        endsIn: "DD/HH/MM"
    },
    {
        id: 1,
        ip: "15.25.111.25.11:8788",
        poseScore: 1785,
        endsIn: "DD/HH/MM"
    },
    {
        id: 1,
        ip: "15.25.111.25.11:8788",
        poseScore: 1785,
        endsIn: "DD/HH/MM"
    },
    {
        id: 1,
        ip: "15.25.111.25.11:8788",
        poseScore: 1785,
        endsIn: "DD/HH/MM"
    }
];

const SharedNodeCard = ({ node }: { node: SharedNode }) => {
    return (
        <div className="w-full sm:w-[502px] lg:w-full p-[1px] bg-gradient-to-l from-[#00AEB9] to-[#EC008C] rounded-[76px]">
            {/* Desktop View */}
            <div className="hidden lg:flex w-full flex-row justify-between items-center gap-[20px] bg-[#1C1840] rounded-[76px] px-[40px] xl:px-[95px] py-[10px]">
                <div className="text-[18px] text-white font-family-sora font-regular">#{node.id}</div>
                <div className="flex flex-row justify-start items-center gap-[23px]">
                    <StatusComponent status={"Online"} />
                    <div className="text-[18px] text-white font-family-sora font-regular">IP {node.ip}</div>
                </div>
                <div className="text-[18px] text-white font-family-sora font-regular">Pose Score: {node.poseScore}</div>
                <div className="text-[18px] text-white font-family-sora font-regular">Ends In: {node.endsIn}</div>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden flex w-full sm:w-[500px] flex-row justify-between items-center gap-[20px] bg-[#1C1840] rounded-[76px] px-[40px] xl:px-[95px] py-[10px]">
                <div className="text-[18px] text-white font-family-sora font-regular pl-[0px] sm:pl-[50px]">#{node.id}</div>
                <StatusComponent status={"Online"} />
                <div className="flex flex-col justify-start items-start gap-[5px] w-[250px]">
                    <div className="text-[18px] text-white font-family-sora font-regular">IP {node.ip}</div>
                    <div className="text-[18px] text-white font-family-sora font-regular">Pose Score: {node.poseScore}</div>
                    <div className="text-[18px] text-white font-family-sora font-regular">Ends In: {node.endsIn}</div>
                </div>
            </div>
        </div>
    );
};

export default function ActiveSharedNodes() {
    return (
        <main className="pt-6 pb-[230px] px-[15px] max-w-[1250px] mx-auto sm:px-0">
            <div className="w-full flex flex-col justify-center items-center text-center">
                <div className="w-full text-[24px] sm:text-[30px] font-family-sora font-bold py-[20px]">ACTIVE SHARED NODES</div>
                <div className="w-full h-[2px] bg-gradient-to-r from-[#221E45] via-[#00AEB9] to-[#221E45]">
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-[20px] sm:gap-[30px] py-[30px] sm:py-[40px]">
                    {sharedNodesData.map((node, index) => (
                        <SharedNodeCard key={index} node={node} />
                    ))}
                </div>
            </div>
        </main>
    )
}
