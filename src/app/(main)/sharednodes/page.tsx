import JoinSharedNodes from "@/components/JoinSharedNodes";
import SharedHostingPlan from "@/components/SharedHostingPlan";
import ActiveSharedNodes from "@/components/ActiveSharedNodes";

export default function SharedNodes() {
    return (
        <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[95px] py-[30px]"
        style={{ background: 'radial-gradient(15.4% 15.4% at 3.16% 18.22%, #1A459C 0%, #080525 100%)' }}>
            <JoinSharedNodes />
            <SharedHostingPlan />
            <ActiveSharedNodes />
        </main>
    )
}
