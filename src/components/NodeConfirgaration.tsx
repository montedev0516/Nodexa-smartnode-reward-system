import Image from "next/image";
import { useState } from "react";

export default function NodeConfirgaration() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-2 sm:p-4">
            <div className="w-full max-w-[960px] h-[913px] border-[1px] border-[#00AEB9] bg-[#080525] rounded-[20px] 
            flex flex-col justify-start items-center px-3 sm:px-[65px] py-3 sm:py-[20px] my-4 sm:my-0">
                {/* Header */}
                <div className="w-full flex flex-row justify-center items-center relative mb-4">
                    <h1 className="text-[20px] sm:text-[34px] font-family-sora font-bold text-white text-center">SMARTNODE DETAILS</h1>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                    >
                        <Image 
                            src="/nodedetail/close-icon.svg" 
                            alt="close-icon" 
                            width={16} 
                            height={16}
                            className="w-[24px] sm:w-[52px] h-[24px] sm:h-[52px]" 
                        />
                    </button>
                </div>

                {/* Divider */}
                <div className="w-full py-2 sm:py-4">
                    <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full" />
                </div>
            </div>
        </div>
    );
}
