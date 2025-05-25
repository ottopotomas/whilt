// src/app/layout.tsx
import "./globals.css"; // Global styles
import type { ReactNode } from "react";
import { Metadata } from "next";
import TopNav from "../components/TopNav";
import AddTILButton from "../components/AddTILButton";
import BottomNav from "../components/BottomNav";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "WHILT",
  description: "what have i learned today?",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body className="bg-gray-50 text-gray-900 min-h-screen antialiased">
        {/* ✅ Top Navigation */}
        <TopNav />

        {/* ✅ Page Content */}
        <main className="pt-16 pb-20 px-4">
          {children}
        </main>

        {/* ✅ Floating Add Button */}
        <AddTILButton />

        {/* ✅ Bottom Navigation */}
        <BottomNav />

        {/* ✅ Toast Notifications */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
