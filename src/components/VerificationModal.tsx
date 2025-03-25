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
  const [verificationCode, setVerificationCode] = React.useState('');
  const [error, setError] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      onVerificationComplete();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1C1840] p-8 rounded-lg w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Verify Your Email</h2>
        <p className="text-gray-300 mb-6">
          We've sent a verification code to {email}. Please enter it below.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-300 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white"
              placeholder="Enter verification code"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVerifying}
              className="px-4 py-2 bg-gradient-to-b from-[#F091C9] to-[#EC008C] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 