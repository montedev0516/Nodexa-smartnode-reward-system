import JoinSharedNodes from "@/components/JoinSharedNodes";
import SharedHostingPlan from "@/components/SharedHostingPlan";
import ActiveSharedNodes from "@/components/ActiveSharedNodes";
export default function SharedNodes() {
    return (
        <main
            className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[95px] py-[30px] relative"
            style={{
                backgroundImage: `url('/Vector.png'), url('/Vector2.png')`, // Update paths
                backgroundPosition: '100% 350px, 0px 0px', // Adjust positions as needed
                backgroundRepeat: 'no-repeat, no-repeat', // Prevent images from repeating
                backgroundSize: 'auto, auto' // Set sizes for images (auto, cover, contain, or specific sizes)
            }}
        >
            <JoinSharedNodes />
            <SharedHostingPlan />
            <ActiveSharedNodes />
        </main>
    );
}