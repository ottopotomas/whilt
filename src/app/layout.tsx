import "./globals.css";
import type { ReactNode } from "react";
import { Metadata } from "next";
import TopNav from "../components/TopNav";
import AddTILButton from "../components/AddTILButton";
import BottomNav from "../components/BottomNav";
import { Toaster } from "sonner";

console.log("TopNav type:", typeof TopNav);
console.log("AddTILButton type:", typeof AddTILButton);
console.log("BottomNav type:", typeof BottomNav);
console.log("Toaster type:", typeof Toaster);

export const metadata: Metadata = {
  title: "WHILT",
  description: "what have i learned today?",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body className="bg-gray-50 text-gray-900 min-h-screen antialiased">
        <TopNav />
        <main className="pt-16 pb-20 px-4">{children}</main>
        <AddTILButton />
        <BottomNav />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
