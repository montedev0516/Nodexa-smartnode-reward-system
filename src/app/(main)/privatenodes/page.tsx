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
           <SmartNodesSetUp/>
       </main>
    )
}