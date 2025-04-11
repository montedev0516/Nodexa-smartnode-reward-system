'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          style: {
            background: '#00AEB9',
          },
        },
        error: {
          style: {
            background: '#FF5252',
          },
        },
      }}
    />
  );
} 