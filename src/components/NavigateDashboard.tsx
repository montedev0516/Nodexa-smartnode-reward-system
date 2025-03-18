"use client"

import { useState } from "react";

export default function NavigateDashboard({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
    const [activeOption, setActiveOption] = useState<'private' | 'shared'>('private');

    return (
        <div className="flex flex-row justify-between items-center py-[40px]">
            <div className="flex flex-col justify-center items-start gap-[20px]">
                <div className="text-[40px] font-semibold text-white font-family-sora">DASHBOARD</div>
                <div 
                    className={`text-[21px] font-bold cursor-pointer ${activeOption === 'private' ? 'text-[#00AEB9]' : 'text-white'}`} 
                    onClick={() => { setIsOpen(true); setActiveOption('private'); }}
                >
                    MY PRIVATE NODES
                </div>
                <div 
                    className={`text-[21px] font-regular cursor-pointer ${activeOption === 'shared' ? 'text-[#00AEB9]' : 'text-white'}`} 
                    onClick={() => { setIsOpen(false); setActiveOption('shared'); }}
                >
                    MY SHARED NODES
                </div>
            </div>
        </div>
    )
}
