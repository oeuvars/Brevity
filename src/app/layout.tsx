import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";
import { Figtree } from 'next/font/google';

const figtree = Figtree({ subsets: ['latin'] });

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
        <body className={`${figtree.className} antialiased bg-[#171717] text-white`}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
