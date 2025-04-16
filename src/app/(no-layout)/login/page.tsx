"use client"

import ReCaptcha from '@/utils/reCaptcha'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import ReCAPTCHA from 'react-google-recaptcha'
import toast from 'react-hot-toast';
// import PasswordStrengthMeter from '@/utils/passwordStrengthMeter';
import Show2FAModal from '@/components/Show2FAModal';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
});

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('from') || '/dashboard';
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorSecret, setTwoFactorSecret] = useState<string | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    try {
      loginSchema.parse(formData);
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

    if (!validateForm()) {
      return;
    }

    if (!recaptchaToken) {
      setErrors(prev => ({ ...prev, recaptcha: 'Please complete the reCAPTCHA verification' }));
      return;
    }

    setIsSubmitting(true);


    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();
      console.log('@@Login response:', data);
      console.log('@@2FA enabled:', data.user.twoFactorEnabled);
      console.log('@@2FA secret:', data.user.twoFactorSecret);

      if (!response.ok) {
        if (data.suggestReset) {
          toast.error('Password is incorrect!');
        }
        // Reset reCAPTCHA on any error
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        toast.error(data.error || 'Login failed');
        return;
      }

      // Check if the 2FA is enabled
      if (data.user.twoFactorEnabled && data.user.twoFactorSecret !== null) {
        console.log('@@2FA enabled:', data);
        toast('2FA is enabled. Please enter the verification code.');
        setTwoFactorSecret(data.user.twoFactorSecret);
        setShow2FA(true);
        return;
      }
      
      // Handle successful login
      console.log('Login successful:', data);
      toast.success('✔ Login successful');

      // Redirect to the requested page or dashboard
      router.push(redirectTo); // Redirect to the requested page or dashboard
    } catch (error) {
      console.error('Login error:', error);
      toast.error('❌ Login failed');
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'An error occurred during login'
      })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[100px] py-[130px]">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full pt-[10px] pb-[10px] text-center">
          <h1 className="text-[48px] font-family-sora font-semibold text-center">Login</h1>
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
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.email ? 'border-red-500' : ''
                  }`}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-[18px] font-bold py-[10px]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.password ? 'border-red-500' : ''
                  }`}
                placeholder="********"
                required
              />
              {/* <PasswordStrengthMeter password={formData.password} /> */}
              {/* {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )} */}
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="font-family-poppins text-[18px]">Forgot your password?</p>
              <Link href="/reset-password" className="text-[#00AEB9] hover:text-blue-300">
                Reset Password
              </Link>
            </div>
            <div className="flex justify-center">
              <ReCaptcha
                ref={recaptchaRef}
                onVerify={(token) => setRecaptchaToken(token)}
                onExpire={() => setRecaptchaToken(null)}
                theme="dark"
              />
            </div>
            {errors.recaptcha && (
              <p className="text-red-500 text-sm text-center">{errors.recaptcha}</p>
            )}
            {/* {errors.submit && (
              <p className="text-red-500 text-sm text-center">{errors.submit}</p>
            )} */}
            <div className="flex justify-center items-center pt-[20px]">
              <button
                type="submit"
                disabled={isSubmitting || !recaptchaToken}
                className={`w-[200px] h-[50px] bg-gradient-to-b from-[#F091C9] to-[#EC008C] font-family-sora text-[25px] text-white py-3 rounded-[45px] transition-colors text-center flex justify-center items-center cursor-pointer ${(isSubmitting || !recaptchaToken) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
            <div className="flex justify-center items-center gap-[20px] pt-[20px]">
              <p className="font-family-poppins text-[18px]">Don't have an account?</p>
              <Link href="/signup" className="text-[#00AEB9] hover:text-blue-300">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
      {/* 2FA Modal */}
      {show2FA && twoFactorSecret !== null && (
        <Show2FAModal
          Email={formData.email}
          TwoFactorSecret={twoFactorSecret}
          RedirectTo={redirectTo}
          isOpen={show2FA}
          onClose={() => {
            setShow2FA(false);
            setTwoFactorSecret(null);
          }}
        />
      )}
    </main>
  )
} 