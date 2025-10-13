"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Providers as ReduxProvider } from "@/app/provider/Provider";
interface Props {
  children: ReactNode;
}
export default function ProvidersClient({ children }: Props) {
  return (
    <ReduxProvider>
      <SessionProvider>{children}</SessionProvider>
    </ReduxProvider>
  );
}
