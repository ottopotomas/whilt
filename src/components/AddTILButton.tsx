'use client';

// components/AddTILButton.tsx
import { usePathname, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import React from "react";

export default function AddTILButton() {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthenticated = false; // 🔐 Replace with real auth check

  // Hide on specific routes
  const hiddenRoutes = ["/settings", "/login", "/signup"];
  if (hiddenRoutes.includes(pathname)) return null;

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/add");
    } else {
      toast("🔒 Sign in to add a TIL");
      router.push("/signup");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-6 w-14 h-14 bg-[#1F1F1F] text-white rounded-full shadow-lg flex items-center justify-center hover:opacity-90 z-50 transition ring-2 ring-white/10 hover:ring-white/20"
      aria-label="Add new TIL"
    >
      <Plus size={28} />
    </button>
  );
}
