// src/app/(auth)/login/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF5] flex flex-col items-center justify-center px-6 py-12">
      {/* Capy Logo */}
      <Image
        src="/logo-with-capy.png" // final logo you approved
        alt="WHILT Logo"
        width={120}
        height={120}
        className="mb-6"
      />

      {/* Heading */}
      <h1 className="text-xl font-semibold lowercase text-[#1F1F1F] mb-1">
        welcome to whilt
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        what have i learned today?
      </p>

      {/* Sign up options */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button className="w-full py-2 rounded-full bg-black text-white font-medium hover:bg-[#1F1F1F] transition">
          Sign up with Email
        </button>
        <button className="w-full py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50">
          Sign up with Google
        </button>
        <button className="w-full py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50">
          Sign up with Apple
        </button>
      </div>

      {/* Login Link */}
      <p className="text-xs text-gray-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="underline text-black">
          Log in
        </Link>
      </p>

      {/* Terms */}
      <p className="text-[10px] text-gray-400 mt-4 text-center max-w-xs leading-tight">
        By continuing, you agree to WHILT’s{" "}
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>.
      </p>
    </div>
  );
}
