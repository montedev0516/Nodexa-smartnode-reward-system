import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark';
  className?: string;
}

export default function ReCaptcha({
  onVerify,
  onExpire,
  theme = 'light',
  className = '',
}: ReCaptchaProps) {
  return (
    <div className={className}>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        onChange={onVerify}
        onExpired={() => onExpire?.()}
        theme={theme}
      />
    </div>
  );
} 