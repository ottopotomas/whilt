"use client";

import React, { useState } from "react";
import OnboardingFlow from "../../components/onboarding/OnboardingFlow";
import TILCard from "../til/TILCard";
import FeedFilter from "../../components/FeedFilter";
import { usePublicTILs } from "../../hooks/usePublicTILs";
import { TIL } from "../../lib/types"; // Adjust path if @ alias fails
import Link from "next/link";

export default function HomePage() {
  const isAuthenticated = true; // 🔄 Replace with real auth logic
  const hasCompletedOnboarding = false; // 🔄 Replace with real user metadata

  const [activeFilter, setActiveFilter] = useState("Trending");
  const { data = [], isLoading } = usePublicTILs();

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#FFFCF5] text-[#1F1F1F]">
      {isAuthenticated && !hasCompletedOnboarding && <OnboardingFlow />}

      {!isAuthenticated && (
        <section className="bg-[#FFFCF5] px-6 pt-2 pb-8 text-center border-b border-gray-200 w-full">
          <h1 className="text-2xl font-bold text-[#0A524B] mt-2 mb-2">
            what have i learned today?
          </h1>
          <p className="text-[#4A8576] italic mb-6">
            Log it. Learn it. Test it. Grow it!
          </p>
          <Link href="/login">
            <button className="bg-gray-900 text-white text-base font-semibold px-6 py-3 rounded-xl hover:bg-black transition mb-6">
              Sign up or Log in
            </button>
          </Link>
          <p className="text-sm text-gray-700">
            Turning casual discovery into intentional learning.{" "}
            <span className="italic">Learn smarter.</span>
          </p>
        </section>
      )}

      {isAuthenticated && (
        <FeedFilter active={activeFilter} setActive={setActiveFilter} />
      )}

      <main className="flex-1 w-full max-w-md px-4 py-6">
        {isLoading ? (
          <p className="text-center text-gray-400">Loading TILs...</p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Looks like no one has posted today’s wisdom yet. Be the first?
          </p>
        ) : (
          <div className="space-y-4">
            {data.map((til: TIL) => (
              <TILCard key={til.id} til={til} />
            ))}
          </div>
        )}
      </main>

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
