import PrivateHostingPlan from "@/components/PrivateHostingPlan";
import SmartNodesSetUp from "@/components/SmartNodesSetUp";

export default function PrivateNodes() {
    return (
       <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[95px] py-[30px]" 
        style={{
            backgroundImage: `url('/Vector.png'), url('/Vector2.png')`, // Update paths
            backgroundPosition: '100% 350px, 0px 0px', // Adjust positions as needed
            backgroundRepeat: 'no-repeat, no-repeat', // Prevent images from repeating
            backgroundSize: 'auto, auto' // Set sizes for images (auto, cover, contain, or specific sizes)
        }}
       >
           <PrivateHostingPlan />
           <main className="pt-6 pb-[230px]">
            <div className="w-full flex flex-col justify-center items-center text-center">
                <div className="w-full text-[30px] font-family-sora font-bold py-[20px]">SMARTNODE SETUP</div>
                <div className="w-full h-[2px] bg-gradient-to-r from-[#221E45] via-[#00AEB9] to-[#221E45] mb-[40px]" />
                <SmartNodesSetUp/>
           </div>
        </main>
       </main>
    )
}