'use client';

import { useSession } from "@supabase/auth-helpers-react";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TopNav() {
  const session = useSession();
  const avatarUrl = session?.user?.user_metadata?.avatar_url;

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b bg-white shadow-sm flex items-center justify-between px-4 h-[72px]">
      {/* Left: Avatar */}
      <div className="w-12">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt="User Avatar"
            width={38}
            height={38}
            className="rounded-full"
          />
        )}
      </div>

      {/* Center: Logo (fixed height, centered vertically) */}
      <div className="flex-1 flex justify-center">
        <Link href="/home">
          <Image
            src="/logo/whilt-main-logo.png"
            alt="WHILT Logo"
            width={240}
            height={96}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Right: Settings */}
      <div className="w-12 flex justify-end pr-2">
        <Link href="/settings" className="text-gray-600 hover:text-black">
          <Settings size={22} />
        </Link>
      </div>
    </header>
  );
}
