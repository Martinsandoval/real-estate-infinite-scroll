"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { Cross2Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import styles from "./Toast.module.css";

type ToastEntry = {
  id: string;
  title: string;
  description?: string;
  open: boolean;
};

type ToastContextValue = {
  /** Show an error toast with an optional description. */
  showErrorToast: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

/** Provides toast state and renders all active toasts + the viewport. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const showErrorToast = useCallback((title: string, description?: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, title, description, open: true }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, open: false } : t))
    );
  }, []);

  return (
    <ToastContext.Provider value={{ showErrorToast }}>
      <RadixToast.Provider duration={6000}>
        {children}

        {toasts.map((toast) => (
          <RadixToast.Root
            key={toast.id}
            open={toast.open}
            onOpenChange={(open) => !open && dismiss(toast.id)}
            className={styles.toast}
          >
            <div className={styles.iconWrapper}>
              <ExclamationTriangleIcon className={styles.icon} />
            </div>

            <div className={styles.body}>
              <RadixToast.Title className={styles.title}>
                {toast.title}
              </RadixToast.Title>
              {toast.description && (
                <RadixToast.Description className={styles.description}>
                  {toast.description}
                </RadixToast.Description>
              )}
            </div>

            <RadixToast.Close className={styles.close} aria-label="Dismiss">
              <Cross2Icon />
            </RadixToast.Close>
          </RadixToast.Root>
        ))}

        <RadixToast.Viewport className={styles.viewport} />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}

/** Returns `showErrorToast`. Must be used inside `ToastProvider`. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
