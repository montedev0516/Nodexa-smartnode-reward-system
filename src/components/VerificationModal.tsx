import React from 'react';

interface VerificationModalProps {
  isOpen: boolean;
  // onClose: () => void;
  email: string;
  onVerificationComplete: () => void;
}

export default function VerificationModal({
  isOpen,
  // onClose,
  email,
  onVerificationComplete,
}: VerificationModalProps) {
  const [isResending, setIsResending] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleResend = async () => {
    setIsResending(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend verification email');
      }

      setSuccess('Verification email has been resent successfully');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[510px] h-[250px] border-[#00AEB9] border-1 bg-[#272E50] pt-[10px] pb-[10px] pl-8 pr-8 rounded-lg">
        <h2 className="text-center text-[20px] font-bold font-family-sora text-white mb-[5px]">Email Verification</h2>
        <div className="w-full h-[2px] bg-gradient-to-r from-[#272E50] via-[#00AEB9] to-[#272E50] mb-[5px]"></div>
        <p className="text-center text-[16px] font-family-sora font-regular text-white mb-[5px]">Thanks for Signing Up!</p>
        <p className="text-center text-[16px] font-family-sora font-regular text-white mb-[5px]">We have sent a verification link to your email. </p>
        <p className="text-center text-[16px] font-family-sora font-regular text-white mb-[5px]">Please check your inbox/spam messages and </p>
        <p className="text-center text-[16px] font-family-sora font-regular text-white mb-[15px]">click the link to complete the sign-up process.</p>
        <p className="text-center text-[16px] font-family-sora font-regular text-white mb-[10px]">If you have not received, please press Resend button.</p>
        {/* {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )} */}
        
        {/* {success && (
          <p className="text-green-500 text-sm mb-4">{success}</p>
        )} */}

        <div className="flex justify-center space-x-4">
          {/* <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Close
          </button> */}
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="w-[92px] h-[25px] bg-gradient-to-b from-[#1EC0CA] to-[#00AEB9] text-white text-center rounded-[45px] hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {isResending ? 'Sending...' : 'Resend'}
          </button>
        </div>
      </div>
    </div>
  );
} 