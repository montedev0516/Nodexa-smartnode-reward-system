import React, { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark';
  className?: string;
}

const ReCaptcha = forwardRef<ReCAPTCHA, ReCaptchaProps>(({
  onVerify,
  onExpire,
  theme = 'light',
  className = '',
}, ref) => {
  return (
    <div className={className}>
      <ReCAPTCHA
        ref={ref}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        onChange={onVerify}
        onExpired={() => onExpire?.()}
        theme={theme}
      />
    </div>
  );
});

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha; 