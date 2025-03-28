interface ShowResetVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ShowResetVerificationModal({
    isOpen,
    onClose,
}: ShowResetVerificationModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-[510px] h-[150px] border-[#00AEB9] border-1 bg-[#272E50] pt-[10px] pb-[10px] pl-8 pr-8 rounded-lg">
                <h2 className="text-center text-[20px] font-bold font-family-sora text-white mb-[5px]">Reset password request</h2>
                <div className="w-full h-[2px] bg-gradient-to-r from-[#272E50] via-[#00AEB9] to-[#272E50] mb-[5px]"></div>
                <p className="text-center text-[16px] font-family-sora font-regular text-white mb-[5px]">We have sent a reset link to your email.</p>
                <p className="text-center text-[16px] font-family-sora font-regular text-white mb-[5px]">Please check your inbox/spam messages and follow the link to</p>
                <p className="text-center text-[16px] font-family-sora font-regular text-white mb-[5px]">create a new password.</p>
            </div>
        </div>
    )
}   
