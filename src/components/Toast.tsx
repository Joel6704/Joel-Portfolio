import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg font-body text-xs font-medium text-white shadow-xl"
      style={{
        background: '#0A1228',
        border: '1px solid #0066FF',
        boxShadow: '0 8px 30px rgba(0, 102, 255, 0.25)',
      }}
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 size={16} style={{ color: '#0066FF' }} className="shrink-0" />
      <span className="tracking-wide">{message}</span>
    </div>
  );
};
