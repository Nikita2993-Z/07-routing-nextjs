import type { ReactNode } from "react";

interface ModalSlotProps {
  children: ReactNode;
}

export default function ModalSlot({ children }: ModalSlotProps) {
  return <>{children}</>;
}