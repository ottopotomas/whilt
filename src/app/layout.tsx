// src/app/layout.tsx
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css"; // if using Tailwind/global styles
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WHILT",
  description: "what have i learned today?",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 text-gray-900 min-h-screen antialiased">
        <main className="flex flex-col min-h-screen">
          {children}
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
