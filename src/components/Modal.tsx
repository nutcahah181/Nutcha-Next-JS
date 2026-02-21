import React from 'react';

type ModalIntent = 'success' | 'error' | 'info' | 'warning';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  intent?: ModalIntent;
  message?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeLabel?: string;
};

export default function Modal({ open, onClose, title, intent = 'info', message, children, footer, closeLabel }: ModalProps) {
  if (!open) return null;

  const badgeClass =
    intent === 'success'
      ? 'bg-green-100 text-green-700'
      : intent === 'error'
        ? 'bg-red-100 text-red-700'
        : intent === 'warning'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-sky-100 text-sky-700';

  const icon = intent === 'success' ? '✓' : intent === 'error' ? '!' : intent === 'warning' ? '!' : 'i';

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-2xl border border-slate-200 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className={`mt-1 h-8 w-8 rounded-lg flex items-center justify-center ${badgeClass}`} aria-hidden>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            {message ? <p className="mt-1 text-sm text-slate-600">{message}</p> : null}
            {children}
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          {footer}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.99]"
            onClick={onClose}
          >
            {closeLabel || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
