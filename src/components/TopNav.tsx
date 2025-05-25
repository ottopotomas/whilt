'use client';

import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@supabase/auth-helpers-react";

export default function TopNav() {
 
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-3 border-b bg-white shadow-sm">
      {/* WHILT Logo */}
      <Link href="/home" className="flex items-center space-x-2">
        <Image
          src="/logo-whilt.svg"
          alt="WHILT Logo"
          width={48} // double original size
          height={48}
        />
        <span className="font-extrabold text-xl text-teal-700">whilt</span>
      </Link>

      {/* Settings icon (nudged left slightly with pr-2) */}
      <Link href="/settings" className="text-gray-600 hover:text-black pr-2">
        <Settings size={22} />
      </Link>
    </header>
  );
}
