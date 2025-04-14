import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    createdAt: string;
    type: 'global' | 'user';
    priceChange?: number;
    isMaxPrice?: boolean;
    isMinPrice?: boolean;
  }>;
}

const Divider = () => (
  <div className="w-full py-[10px]">
    <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full" />
  </div>
);

export default function NotificationModal({ isOpen, onClose, notifications }: NotificationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (

    <div ref={modalRef} className="absolute top-15 right-0 flex flex-col justify-start items-center w-[375px] h-[205px] border-[1px] border-[#00AEB9] bg-[#272E50] rounded-[10px] p-2 z-50">
      <div className="w-full flex flex-row justify-center items-center relative">
        <h2 className="text-center text-[13px] font-regular font-family-sora text-white">Notifications</h2>
        <button
          onClick={onClose}
          className="absolute top-0 right-1 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <Divider />
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-400">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 mb-2 rounded-lg bg-[#1C1840]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{notification.title}</h3>
                  <p className="text-sm text-gray-300">{notification.message}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

  );
}
