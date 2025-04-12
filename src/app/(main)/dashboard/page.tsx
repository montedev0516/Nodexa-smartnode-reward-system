"use client"

import MyPrivateNodes from "@/components/MyPrivateNodes"
import SharedNodes from "@/components/SharedNodes"
import PrivateNodesStatus from "@/components/PrivateNodesStatus"
import SharedNodesStatus from "@/components/SharedNodesStatus"

import { useState } from "react"

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeOption, setActiveOption] = useState<'private' | 'shared'>('private');

    return (
        <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[95px] pt-[60px]">
            <div className="w-full flex flex-col xl:flex-row gap-[11px]">
                <div className="flex flex-col justify-center items-start gap-[21px]">
                    <div className="text-[40px] font-semibold text-white font-family-sora">DASHBOARD</div>
                    <div
                        className={` cursor-pointer ${activeOption === 'private' ? 'text-[#00AEB9] text-[24px] font-bold' : 'text-white text-[21px] font-regular'}`}
                        onClick={() => { setIsOpen(false); setActiveOption('private'); }}
                    >
                        MY PRIVATE NODES
                    </div>
                    <div
                        className={`cursor-pointer ${activeOption === 'shared' ? 'text-[#00AEB9] text-[24px] font-bold' : 'text-white text-[21px] font-regular'}`}
                        onClick={() => { setIsOpen(true); setActiveOption('shared'); }}
                    >
                        MY SHARED NODES
                    </div>
                </div>
                <div className="w-full h-full">
                    {!isOpen && <PrivateNodesStatus/>}
                    {isOpen && <SharedNodesStatus/>}
                </div>
            </div>
            {!isOpen && <MyPrivateNodes />}
            {isOpen && <SharedNodes />}
        </main>
    )
}
