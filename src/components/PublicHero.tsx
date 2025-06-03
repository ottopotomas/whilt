// components/PublicHero.tsx
import React from "react";
import Link from "next/link";

export default function PublicHero() {
  return (
    <section className="bg-[#FFFCF5] px-6 py-8 text-center border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">what have i learned today?</h1>
      <p className="italic text-gray-600 mb-6">Log it. Learn it. Test it. Grow it!</p>

      <Link href="/login">
        <button className="bg-gray-900 text-white text-base font-semibold px-5 py-3 rounded-xl hover:bg-black transition">
          Sign up or Log in
        </button>
      </Link>

      <p className="mt-5 text-sm text-gray-700">
        Turning casual discovery into intentional learning. <span className="italic">Learn smarter.</span>
      </p>
    </section>
  );
}
