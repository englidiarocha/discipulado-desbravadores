"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AccessContextValue {
  hasAccess: boolean;
  loading: boolean;
  grantAccess: () => void;
}

const AccessContext = createContext<AccessContextValue>({
  hasAccess: false,
  loading: true,
  grantAccess: () => {},
});

const STORAGE_KEY = "discipulado_access_granted";

export function AccessProvider({ children }: { children: ReactNode }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setHasAccess(stored === "true");
    setLoading(false);
  }, []);

  function grantAccess() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setHasAccess(true);
  }

  return (
    <AccessContext.Provider value={{ hasAccess, loading, grantAccess }}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  return useContext(AccessContext);
}
