'use client';

import { useState } from 'react';
import ReCaptcha from '@/utils/reCaptcha';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!recaptchaToken) {
      newErrors.recaptcha = 'Please complete the reCAPTCHA verification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement your reset password API call here
      console.log('Reset password requested for:', { email, recaptchaToken });
      
      // Simulate success
      setIsSuccess(true);
    } catch (error) {
      console.error('Reset password error:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to reset password. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[100px] py-[130px]">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full pt-[10px] pb-[10px] text-center">
            <h1 className="text-[48px] font-family-sora font-semibold text-center">Check your email</h1>
          </div>
          <div className="w-full py-[10px]">
            <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full">
            </div>
          </div>
          <div className="w-[300px] sm:w-[527px] py-[100px] text-center">
            <p className="text-[18px] mb-6">
              We've sent password reset instructions to your email address.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="w-[300px] h-[50px] bg-gradient-to-b from-[#F091C9] to-[#EC008C] font-family-sora text-[25px] text-white py-3 rounded-[45px] transition-colors text-center flex justify-center items-center cursor-pointer hover:opacity-90"
            >
              Try another email
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[100px] py-[130px]">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full pt-[10px] pb-[10px] text-center">
          <h1 className="text-[48px] font-family-sora font-semibold text-center">Reset your password</h1>
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
                value={email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div className="flex justify-center items-center">
              <ReCaptcha
                onVerify={(token) => setRecaptchaToken(token)}
                onExpire={() => setRecaptchaToken(null)}
                theme="dark"
                className="w-full"
              />
            </div>
            {errors.recaptcha && (
              <p className="text-sm text-red-500 text-center">{errors.recaptcha}</p>
            )}

            <div className="flex justify-center items-center pt-[20px]">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-[300px] h-[50px] bg-gradient-to-b from-[#F091C9] to-[#EC008C] font-family-sora text-[25px] text-white py-3 rounded-[45px] transition-colors text-center flex justify-center items-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Reset Password'}
              </button>
            </div>
            {errors.submit && (
              <p className="text-sm text-red-500 text-center">{errors.submit}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
} 