'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReCaptcha from '@/utils/reCaptcha';
import VerificationModal from '@/components/VerificationModal';
import { z } from 'zod'
import ReCAPTCHA from 'react-google-recaptcha';
import PasswordStrengthMeter from '@/utils/passwordStrengthMeter';
import toast from 'react-hot-toast';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, { message: 'Password must be less than 32 characters' })
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignUp() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // const [isVerified, setIsVerified] = useState(false);
  const handleCaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    // Clear recaptcha error if it exists
    if (errors.recaptcha) {
      setErrors(prev => ({
        ...prev,
        recaptcha: ''
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    if (!recaptchaToken) {
      setErrors(prev => ({ ...prev, recaptcha: 'Please complete the reCAPTCHA verification' }));
      toast.error('Please complete the reCAPTCHA verification!');
      return false;
    }
    try {
      signupSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      toast.error('Please check your inputs!');
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (!recaptchaToken) {
      setErrors(prev => ({ ...prev, recaptcha: 'Please complete the reCAPTCHA verification' }));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Reset reCAPTCHA on error
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        toast.error(data.error || 'Failed to sign up');
        return;
      }
      toast.success('✔ Signup successful');

      // Show verification modal instead of success message
      setShowVerificationModal(true);
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to sign up. Please try again.');
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Failed to sign up. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationComplete = () => {
    setShowVerificationModal(false);
    setIsSuccess(true);
    // Redirect to login page after 3 seconds
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[100px] py-[130px]">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full pt-[10px] pb-[10px] text-center">
            <h1 className="text-[48px] font-family-sora font-semibold text-center">Account Created</h1>
          </div>
          <div className="w-full py-[10px]">
            <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full">
            </div>
          </div>
          <div className="w-[300px] sm:w-[527px] py-[100px] text-center">
            <p className="text-[18px] mb-6">
              Your account has been created successfully. Please check your email to verify your account.
            </p>
            <p className="text-sm text-gray-400">
              Redirecting to login page...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[100px] py-[130px]">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full pt-[10px] pb-[10px] text-center">
          <h1 className="text-[48px] font-family-sora font-semibold text-center">Sign Up</h1>
        </div>
        <div className="w-full py-[10px]">
          <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full">
          </div>
        </div>
        <div className="w-[300px] sm:w-[527px] py-[100px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-family-poppins text-[18px] font-bold py-[10px]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder="Enter your email"
                required
              />
              {/* {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )} */}
            </div>
            <div>
              <label htmlFor="password" className="block text-[18px] font-bold py-[10px]">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.password ? 'border-red-500' : ''
                }`}
                placeholder="********"
                required
              />
              <PasswordStrengthMeter password={formData.password} />
              {/* {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )} */}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-[18px] font-bold py-[10px]">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
                placeholder="********"
                required
              />
              {/* {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )} */}
            </div>
            
            <div className="flex justify-center items-center">
              <ReCaptcha
                ref={recaptchaRef}
                onVerify={handleCaptchaChange}
                theme="dark"
                className="w-full flex justify-center"
              />
            </div>
            {errors.recaptcha && (
              <p className="text-sm text-red-500 text-center">{errors.recaptcha}</p>
            )}

            <div className="flex justify-center items-center pt-[20px]">
              <button
                type="submit"
                disabled={isSubmitting || !recaptchaToken}
                className={`w-[200px] h-[50px] bg-gradient-to-b from-[#F091C9] to-[#EC008C] font-family-sora text-[25px] text-white py-3 rounded-[45px] transition-colors text-center flex justify-center items-center ${
                  (isSubmitting || !recaptchaToken) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'
                }`}
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
            {/* {errors.submit && (
              <p className="text-sm text-red-500 text-center">{errors.submit}</p>
            )} */}
          </form>
        </div>
      </div>
      
      <VerificationModal
        isOpen={showVerificationModal}
        // onClose={() => setShowVerificationModal(false)}
        email={formData.email}
        onVerificationComplete={handleVerificationComplete}
      />
    </main>
  );
} 