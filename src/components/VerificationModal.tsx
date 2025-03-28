import React from 'react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerificationComplete: () => void;
}

export default function VerificationModal({
  isOpen,
  onClose,
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
      <div className="bg-[#1C1840] p-8 rounded-lg w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Email Verification</h2>
        <p className="text-gray-300 mb-6">
          Thanks for Signing Up! We have sent a verification link to your email. Please check your inbox/spam messages and click the link to complete the sign-up process. If you have not received email please press Resend button.
        </p>
        
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        
        {success && (
          <p className="text-green-500 text-sm mb-4">{success}</p>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="px-4 py-2 bg-gradient-to-b from-[#F091C9] to-[#EC008C] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {isResending ? 'Sending...' : 'Resend'}
          </button>
        </div>
      </div>
    </div>
  );
} 