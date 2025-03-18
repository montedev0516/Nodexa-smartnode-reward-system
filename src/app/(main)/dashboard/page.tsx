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
            <div className="flex flex-row gap-[20px]">
                <div className="flex flex-col justify-center items-start gap-[20px]">
                    <div className="text-[40px] font-semibold text-white font-family-sora">DASHBOARD</div>
                    <div
                        className={`text-[21px] font-bold cursor-pointer ${activeOption === 'private' ? 'text-[#00AEB9]' : 'text-white'}`}
                        onClick={() => { setIsOpen(false); setActiveOption('private'); }}
                    >
                        MY PRIVATE NODES
                    </div>
                    <div
                        className={`text-[21px] font-regular cursor-pointer ${activeOption === 'shared' ? 'text-[#00AEB9]' : 'text-white'}`}
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
