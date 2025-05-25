'use client';

import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Medal,
  Brain,
  BarChart2,
  Bell,
} from "lucide-react";
import { toast } from "react-hot-toast";
import React from "react";

// Navigation configuration
const navItems = [
  { icon: <Home size={22} />, label: "Feed", href: "/feed", auth: false },
  { icon: <Medal size={22} />, label: "Achievements", href: "/achievements", auth: true },
  { icon: <Brain size={22} />, label: "Bank", href: "/profile?tab=bank", auth: true },
  { icon: <BarChart2 size={22} />, label: "Summaries", href: "/summaries", auth: true },
  { icon: <Bell size={22} />, label: "Alerts", href: "/notifications", auth: true },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = false; // 🔐 Replace with actual auth logic

  // Hide nav bar on certain routes
  const hiddenRoutes = ["/login", "/signup", "/settings"];
  if (hiddenRoutes.includes(pathname)) return null;

  const handleClick = (item: (typeof navItems)[0]) => {
    if (item.auth && !isAuthenticated) {
      toast("🔒 Sign in to access " + item.label.toLowerCase());
      router.push("/signup");
    } else {
      router.push(item.href);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#e6f4f1] border-t border-teal-300 flex justify-around py-2 z-40 shadow-inner">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <button
            key={item.label}
            onClick={() => handleClick(item)}
            className={`flex flex-col items-center text-xs ${
              isActive ? "text-[#0A524B] font-semibold" : "text-gray-600 hover:text-black"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
