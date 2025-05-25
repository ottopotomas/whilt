'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Settings } from 'lucide-react';
import { useSession } from '@supabase/auth-helpers-react';

export default function TopNav() {
  const session = useSession();
  const user = session?.user;
  const router = useRouter();

  const isAuthenticated = !!user;

  const handleAuthPrompt = () => {
    toast.message('Please sign in to access this feature.');
    router.push('/login');
  };

  return (
    <header className="fixed top-0 z-50 w-full px-4 py-3 flex items-center justify-between bg-[#FFFCF5] border-b border-gray-200">
      {/* Left: Avatar */}
      {isAuthenticated ? (
        <Link href="/profile">
          <Image
            src={user?.user_metadata?.avatar_url || '/avatar-default.png'}
            alt="Profile Avatar"
            width={32}
            height={32}
            className="rounded-full cursor-pointer"
          />
        </Link>
      ) : (
        <button onClick={handleAuthPrompt}>
          <Image
            src="/avatar-default.png"
            alt="Default Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </button>
      )}

      {/* Center: Logo */}
      <Link href="/home">
        <Image
          src="/whilt-logo.svg"
          alt="WHILT Logo"
          width={100}
          height={30}
          className="cursor-pointer"
        />
      </Link>

      {/* Right: Settings */}
      {isAuthenticated ? (
        <Link href="/settings">
          <Settings className="w-6 h-6 text-gray-800 cursor-pointer" />
        </Link>
      ) : (
        <button onClick={handleAuthPrompt}>
          <Settings className="w-6 h-6 text-gray-400 cursor-pointer" />
        </button>
      )}
    </header>
  );
}
