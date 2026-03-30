"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { StartProjectModal } from "@/components/studio/start-project-modal";

type StartProjectModalContextValue = {
  openStartProject: (source?: string) => void;
};

const StartProjectModalContext =
  createContext<StartProjectModalContextValue | null>(null);

type StartProjectModalProviderProps = {
  children: ReactNode;
};

// The provider keeps one shared modal instance alive so every primary CTA opens the same intake flow.
export function StartProjectModalProvider({
  children,
}: StartProjectModalProviderProps) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string>();

  const value = useMemo(
    () => ({
      openStartProject(nextSource?: string) {
        setSource(nextSource);
        setOpen(true);
      },
    }),
    [],
  );

  return (
    <StartProjectModalContext.Provider value={value}>
      {children}
      <StartProjectModal open={open} onOpenChange={setOpen} source={source} />
    </StartProjectModalContext.Provider>
  );
}

export function useStartProjectModal() {
  const context = useContext(StartProjectModalContext);

  if (!context) {
    throw new Error("useStartProjectModal must be used within StartProjectModalProvider.");
  }

  return context;
}
