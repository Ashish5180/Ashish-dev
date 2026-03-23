'use client';
import { useEffect, useState } from 'react';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  body?: string;
}

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: number) => void;
}

const icons = {
  success: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" fill="#eaf3de" stroke="#3b6d11" strokeWidth="1"/>
      <path d="M4.5 7l2 2 3-3" stroke="#3b6d11" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" fill="#fcebeb" stroke="#a32d2d" strokeWidth="1"/>
      <path d="M5 5l4 4M9 5l-4 4" stroke="#a32d2d" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  warning: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" fill="#faeeda" stroke="#854f0b" strokeWidth="1"/>
      <path d="M7 4.5v3" stroke="#854f0b" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="7" cy="9.5" r="0.7" fill="#854f0b"/>
    </svg>
  ),
  info: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" fill="#eeedfe" stroke="#534ab7" strokeWidth="1"/>
      <path d="M7 6.5v3" stroke="#534ab7" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="7" cy="4.5" r="0.7" fill="#534ab7"/>
    </svg>
  ),
};

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 4000);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  return (
    <div
      className="flex items-start gap-3 bg-white border border-[#d3d1c7] rounded-lg px-3 py-2.5 min-w-[260px] max-w-[320px] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      }}
    >
      <div className="mt-0.5 shrink-0">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-[#2c2c2a] font-mono">{toast.title}</p>
        {toast.body && <p className="text-[11px] text-[#888780] font-mono mt-0.5">{toast.body}</p>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 text-[#b4b2a9] hover:text-[#2c2c2a] transition-colors leading-none mt-0.5"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-[100]">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
