import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";
import { Afacad_Flux } from 'next/font/google';

const afacadFlux = Afacad_Flux({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Bervity",
  description: "Bervity is an AI Powered platform for creating and managing your own events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${afacadFlux.className} text-base antialiased bg-[#171717] text-white`}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
