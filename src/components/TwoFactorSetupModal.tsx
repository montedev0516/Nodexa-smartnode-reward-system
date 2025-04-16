'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface TwoFactorSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEnable: () => Promise<void>;
    onActivate: () => Promise<void>;
    email: string;
    qrCode: string;
    backupCodes: string[];
    secret: string;
}

const Divider = () => (
    <div className="w-full py-[20px]">
        <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full" />
    </div>
);

export default function TwoFactorSetupModal({ isOpen, onClose, onEnable, onActivate, email,qrCode, backupCodes, secret }: TwoFactorSetupModalProps) {
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCopyRecoveryCode = () => {
        navigator.clipboard.writeText(backupCodes[0]);
        toast.success('Recovery code copied to clipboard');
    };

    const handleEnable = async () => {
        
        if (!verificationCode || verificationCode.length !== 6) {
            toast.error('Please enter a valid 6-digit code');
            return;
        }

        setIsLoading(true);
        try {
            console.log("verificationCode", verificationCode);
            // Verify the code
            const response = await fetch('/api/auth/2fa/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    secret,
                    token: verificationCode
                }),
            });

            if (!response.ok) {
                throw new Error('Invalid verification code');
            }

            await onEnable();
            await onActivate();
            toast.success('2FA enabled successfully');
            onClose();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to enable 2FA');
        } finally {
            setIsLoading(false);
        }
    };

   
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#080525] p-8 rounded-lg w-[500px]">
                <h2 className="text-2xl font-bold text-center text-white">2FA SETUP</h2>
                <Divider />

                {/* Recovery Code Section */}
                <div className="mb-6">
                    <h3 className="text-white font-regular mb-2">1. Recovery Code</h3>
                    <div className="flex flex-row justify-between">
                        <div className="flex w-full border-[#00AEB9] border-1 p-4 rounded-lg mb-2 overflow-x-auto">
                            {backupCodes.length > 0 ? (
                                backupCodes.map((code, index) => (
                                    <p key={index} className="text-white font-mono flex-1">{code}</p>
                                ))
                            ) : (
                                <p className="text-white font-mono">Loading recovery code...</p>
                            )}
                        </div>
                        <button
                            onClick={handleCopyRecoveryCode}
                            disabled={backupCodes.length === 0}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
                            aria-label="Copy recovery code"
                        >
                            <Image
                                src="/nodedetail/copy-icon.svg"
                                alt="Copy"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                        </button>
                    </div>
                    <p className="text-white font-regular mt-2">
                        Copy and store the recovery code in a safe place before you continue to step 2.
                        The Recovery code can be used in case you can not receive 2fa code.
                    </p>
                </div>

                {/* QR Code Section */}
                <div className="mb-6">
                    <h3 className="text-white font-regular mb-2">
                        2. Scan the barcode below with your Two Factor Authentication app
                    </h3>
                    <div className="bg-white p-4 rounded-lg flex justify-center">
                        {qrCode ? (
                            <Image src={qrCode} alt="QR Code" width={200} height={200} />
                        ) : (
                            <div className="w-[200px] h-[200px] flex items-center justify-center">
                                <p className="text-gray-500">Loading QR code...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Verification Code Section */}
                <div className="mb-6">
                    <h3 className="text-white font-regular mb-2">
                        3. After scanning the barcode the app will generate a six-digit code. Please enter the code here and press Enable button.
                    </h3>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full p-2 rounded-lg bg-[#080525] text-white border border-[#00AEB9]"
                        placeholder="Enter 6-digit code"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-white border border-[#00AEB9] rounded-lg hover:bg-[#00AEB9]/10"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleEnable}
                        disabled={isLoading || verificationCode.length !== 6}
                        className={`px-4 py-2 bg-[#00AEB9] text-white rounded-lg ${
                            isLoading || verificationCode.length !== 6 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                        }`}
                    >
                        {isLoading ? 'Activating...' : 'Enable'}
                    </button>
                </div>
            </div>
        </div>
    );
} 