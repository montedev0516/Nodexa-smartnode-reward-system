import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: HTMLElement, options: any) => number;
      reset: (widgetId: number) => void;
    };
  }
}

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
  theme?: 'light' | 'dark';
  className?: string;
}

export default function ReCaptcha({
  onVerify,
  onExpire,
  theme = 'light',
  className = '',
}: ReCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    const loadRecaptcha = () => {
      if (!mountedRef.current || !containerRef.current) return;

      try {
        // Clean up any existing reCAPTCHA elements
        const existingElements = document.querySelectorAll('.g-recaptcha');
        existingElements.forEach(element => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        });

        // Create a new container for this instance
        const container = document.createElement('div');
        container.className = `g-recaptcha ${className}`;
        containerRef.current.appendChild(container);

        // Render reCAPTCHA
        widgetIdRef.current = window.grecaptcha.render(container, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          theme,
          callback: (token: string) => {
            if (mountedRef.current) {
              onVerify(token);
            }
          },
          'expired-callback': () => {
            if (mountedRef.current) {
              onExpire();
            }
          },
        });
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error);
      }
    };

    // Load reCAPTCHA script if not already loaded
    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.grecaptcha.ready(loadRecaptcha);
      };
      document.head.appendChild(script);
    } else {
      window.grecaptcha.ready(loadRecaptcha);
    }

    return () => {
      mountedRef.current = false;
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
  }, [onVerify, onExpire, theme, className]);

  return <div ref={containerRef} className={className} />;
} 