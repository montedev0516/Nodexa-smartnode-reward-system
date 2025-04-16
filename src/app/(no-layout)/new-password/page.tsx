'use client';

import { useState, useEffect, useRef } from 'react';  
import { useRouter, useSearchParams } from 'next/navigation';
import ReCaptcha from '@/utils/reCaptcha';
import { z } from 'zod';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import PasswordStrengthMeter from '@/utils/passwordStrengthMeter';

const newPasswordSchema = z.object({
  password: z.string()
    .min(8, 'password is required!')
    .max(32, { message: 'Password must be less than 32 characters' })
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().min(8, 'confirm password is required!'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function NewPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  console.log("token", token);

  useEffect(() => {
    if (!token) {
      router.push('/reset-password');
    }
  }, [token, router]);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      toast.error('Please complete the reCaptcha verification');
      setErrors(prev => ({ ...prev, recaptcha: 'Please complete the reCaptcha verification' }));
      return false;
    }
    try {
      newPasswordSchema.parse(formData);
      console.log('Form data is valid:', newPasswordSchema.parse(formData));
      setErrors({});
      return true;
    } catch (error) {
      toast.error('Please check your password');
      toast.success('Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character!');
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
      toast.error('Please complete the reCaptcha verification');
      setErrors(prev => ({ ...prev, recaptcha: 'Please complete the reCaptcha verification' }));
      return;
    }

    if (!token) {
      toast.error('Invalid reset token');
      setErrors(prev => ({ ...prev, submit: 'Invalid reset token' }));
      return;
    }

    setIsSubmitting(true);

    console.log("here, here!");
    try {
      const response = await fetch('/api/auth/new-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, token, recaptchaToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Reset reCAPTCHA on error
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        toast.error(data.error || 'Failed to set new password');
        return;
        // throw new Error(data.error || 'Failed to set new password');
      }
      
      setIsSuccess(true);
      toast.success('Password set successfully!');

      // Redirect to login page after 3 seconds
      console.log('Redirecting to login page...');

      router.push('/login');
      
    } catch (error) {
      console.error('Set new password error:', error);
      toast.error('Failed to set new password. Please try again.');
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Failed to set new password. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[100px] py-[130px]">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full pt-[10px] pb-[10px] text-center">
          <h1 className="text-[48px] font-family-sora font-semibold text-center">New Password</h1>
        </div>
        <div className="w-full py-[10px]">
          <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full">
          </div>
        </div>
        <div className="w-[300px] sm:w-[527px] py-[100px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block font-family-poppins text-[18px] font-bold py-[10px]">
                Set New Password
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
                placeholder="Enter new password"
                required
              />
              <PasswordStrengthMeter password={formData.password} />
              {/* {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )} */}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-[18px] font-bold py-[10px]">
                Confirm New Password
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
                placeholder="Confirm new password"
                required
              />
              {/* {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )} */}
            </div>
            
            <div className="flex justify-center items-center">
              <ReCaptcha
                ref={recaptchaRef}
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
                disabled={isSubmitting || !recaptchaToken}
                className={`w-[200px] h-[50px] bg-gradient-to-b from-[#F091C9] to-[#EC008C] font-family-sora text-[25px] text-white py-3 rounded-[45px] transition-colors text-center flex justify-center items-center ${
                  (isSubmitting || !recaptchaToken) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'
                }`}
              >
                {isSubmitting ? 'Setting...' : 'Set'}
              </button>
            </div>
            {/* {errors.submit && (
              <p className="text-sm text-red-500 text-center">{errors.submit}</p>
            )} */}
          </form>
        </div>
      </div>
    </main>
  );
} 