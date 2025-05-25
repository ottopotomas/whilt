'use client';

import { useSession } from "@supabase/auth-helpers-react";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TopNav() {
  const session = useSession();
  const avatarUrl = session?.user?.user_metadata?.avatar_url;

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 border-b bg-white shadow-sm h-24">
      {/* Left side: Avatar if signed in */}
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

      {/* Center: Logo */}
      <div className="flex justify-center flex-1">
        <Link href="/home" className="flex items-center space-x-2">
          <Image
            src="/logo/whilt-main-logo.png"
            alt="WHILT Logo"
            width={96} // triple size
            height={96}
            className="w-24 h-24"
            priority
          />
        </Link>
      </div>

      {/* Right side: Settings */}
      <div className="w-12 flex justify-end pr-2">
        <Link href="/settings" className="text-gray-600 hover:text-black">
          <Settings size={22} />
        </Link>
      </div>
    </header>
  );
}
