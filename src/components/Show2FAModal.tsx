import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import { z } from 'zod';
import QRCode from 'qrcode';
import toast from 'react-hot-toast';

interface Show2FAModalProps {
    Email: string;
    TwoFactorSecret: string | null;
    RedirectTo: string;
    isOpen: boolean;
    onClose: () => void;
}

const twoFactorSchema = z.object({
  code: z.string().min(6, 'Code must be 6 digits'),
});

const Divider = () => (
    <div className="w-full pb-4">
        <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full" />
    </div>
);

export default function Show2FAModal({ 
  Email, 
  TwoFactorSecret, 
  RedirectTo,
  isOpen,
  onClose 
}: Show2FAModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
      setIsValid(false);
    }
  }, [isOpen]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    if (!TwoFactorSecret) {
      toast.error('2FA is not properly configured');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: Email, 
          secret: TwoFactorSecret, 
          token: code 
        }),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        setIsLoading(false);
        return;
      }

      if (data.success) {
        toast.success('2FA verified successfully');
        onClose();
        router.push(RedirectTo);
      }
    } catch (error) {
      toast.error('Failed to verify 2FA');
    } finally {
      setIsLoading(false);
    }
  }

  // Update validation state whenever code changes
  useEffect(() => {
    const result = twoFactorSchema.safeParse({ code });
    setIsValid(result.success);
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError('');
    }
  }, [code]);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="w-[500px] bg-[#080525] p-8 rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">2FA Verification</h2>
        <Divider />
        <p className="mb-4 text-center">Please enter the 2FA code to login.</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Enter your 2FA code"
            className="w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button 
            type="submit"
            className="w-full px-3 py-2 bg-[#00AEB9] text-white rounded-lg hover:bg-[#008080] transition-colors mt-4"
            disabled={isLoading || !isValid}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>  
        </form>
      </div>
    </div>
  );
}


