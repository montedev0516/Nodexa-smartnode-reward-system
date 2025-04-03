import React from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000098] flex items-center justify-center z-50">
      <div className="w-[310px] h-[115px] bg-[#272E50] border-[1px] border-[#00AEB9] rounded-[10px]">
        <h2 className="text-center text-white text-[13px] font-family-sora font-regular pt-[5px] pb-[5px]">Log Out</h2>
        <div className="w-full h-[2px] bg-gradient-to-r from-[#272E50] via-[#00AEB9] to-[#272E50]"></div>
        <p className="text-center text-white text-[13px] font-family-sora font-regular pt-[15px] pb-[21px]">Are you sure you want to Log Out?</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={onConfirm}
            className="w-[44px] h-[16px] bg-[#00AEB9] flex items-center justify-center
            text-white text-[13px] font-family-sora font-regular rounded-full hover:text-white transition-colors duration-300 cursor-pointer"
          >
            Yes
          </button>
          <button 
            onClick={onClose}
            className="w-[44px] h-[16px] bg-[#00AEB9] flex items-center justify-center
            text-white text-[13px] font-family-sora font-regular rounded-full hover:opacity-90 transition-opacity duration-300 cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal; 