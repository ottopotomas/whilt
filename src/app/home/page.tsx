// src/app/home/page.tsx
"use client";

import React, { useState } from "react";
import { TILCard } from "../../components/TILCard";
import FeedFilter from "../../../components/FeedFilter";
import { usePublicTILs } from "../../hooks/usePublicTILs";
import Image from "next/image";
import Link from "next/link";


export default function HomePage() {
  const isAuthenticated = false; // 🔄 Replace with real auth logic
  const [activeFilter, setActiveFilter] = useState("Trending");
  const { tils, isLoading } = usePublicTILs();

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#FFFCF5] text-[#1F1F1F]">
      {/* Hero Section - only for guests */}
      {!isAuthenticated && (
        <section className="bg-[#FFFCF5] px-6 py-8 text-center border-b border-gray-200 w-full">
          <div className="flex justify-center mb-4">
            <Image src="/logo/whilt-main-logo.png" alt="WHILT logo" width={160} height={50} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">what have i learned today?</h1>
          <p className="italic text-gray-600 mb-4">Log it. Learn it. Test it. Grow it!</p>

          <Link href="/login">
            <button className="bg-gray-900 text-white text-base font-semibold px-6 py-3 rounded-xl hover:bg-black transition">
              Sign up or Log in
            </button>
          </Link>

          <p className="mt-4 text-sm text-gray-700">
            Turning casual discovery into intentional learning. <span className="italic">Learn smarter.</span>
          </p>
        </section>
      )}

      {/* Filter tabs - only for signed in users */}
      {isAuthenticated && (
        <FeedFilter active={activeFilter} setActive={setActiveFilter} />
      )}

      {/* TIL Feed */}
      <main className="flex-1 w-full max-w-md px-4 py-6">
        {isLoading ? (
          <p className="text-center text-gray-400">Loading TILs...</p>
        ) : tils.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Looks like no one has posted today’s wisdom yet. Be the first?
          </p>
        ) : (
          <div className="space-y-4">
            {tils.map((til) => (
              <TILCard key={til.id} til={til} />
            ))}
          </div>
        )}
      </main>

      {/* Sticky Bottom Banner CTA (only for guests) */}
      {!isAuthenticated && (
        <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 p-4 flex justify-center z-30">
          <Link href="/login">
            <button className="bg-[#1F1F1F] text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-[#333] transition">
              Ready to grow your knowledge? 👉 Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
