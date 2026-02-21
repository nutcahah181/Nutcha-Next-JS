'use client';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import Modal from './Modal';

export type ModalIntent = 'success' | 'error' | 'info' | 'warning';

type ModalState = {
  open: boolean;
  title: string;
  intent: ModalIntent;
  message?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  closeLabel?: string;
};

const defaultState: ModalState = {
  open: false,
  title: '',
  intent: 'info',
  message: undefined,
  content: undefined,
  footer: undefined,
};

export type OpenModalOptions = {
  title: string;
  intent?: ModalIntent;
  message?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  closeLabel?: string;
};

type ModalContextValue = {
  openModal: (opts: OpenModalOptions) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>(defaultState);

  const openModal = useCallback((opts: OpenModalOptions) => {
    setState({
      open: true,
      title: opts.title,
      intent: opts.intent ?? 'info',
      message: opts.message,
      content: opts.content,
      footer: opts.footer,
      closeLabel: opts.closeLabel,
    });
  }, []);

  const closeModal = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  const value = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal
        open={state.open}
        onClose={closeModal}
        title={state.title}
        intent={state.intent}
        message={state.message}
        footer={state.footer}
        closeLabel={state.closeLabel}
      >
        {state.content}
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
}
