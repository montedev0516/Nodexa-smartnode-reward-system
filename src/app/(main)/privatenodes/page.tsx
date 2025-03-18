import PrivateHostingPlan from "@/components/PrivateHostingPlan";
import SmartNodesSetUp from "@/components/SmartNodesSetUp";

export default function PrivateNodes() {
    return (
       <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[95px] py-[30px]" 
       style={{ background: 'radial-gradient(35.4% 22.4% at 119.16% 35.22%, #8164AC 0%, #080525 100%)' }} >
           <PrivateHostingPlan />
           <SmartNodesSetUp/>
       </main>
    )
}