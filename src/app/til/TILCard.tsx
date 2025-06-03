"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share,
  Brain,
  FlaskConical,
  Landmark,
  BookOpenCheck,
  Globe2,
  Code2,
  Languages,
  DollarSign,
  HeartPulse,
  Users,
  Gavel,
  Leaf,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";
import MoreOptionsMenu from "../../components/MoreOptionsMenu";
import type { TIL } from "@/lib/types";

const categoryIcons: Record<string, React.ReactElement> = {
  Science: <FlaskConical size={14} />,
  History: <Landmark size={14} />,
  Literature: <BookOpenCheck size={14} />,
  Psychology: <Brain size={14} />,
  Culture: <Globe2 size={14} />,
  Geography: <Globe2 size={14} />,
  Technology: <Code2 size={14} />,
  Language: <Languages size={14} />,
  Economics: <DollarSign size={14} />,
  Finance: <DollarSign size={14} />,
  Health: <HeartPulse size={14} />,
  Sociology: <Users size={14} />,
  Relationships: <Users size={14} />,
  Law: <Gavel size={14} />,
  Politics: <Gavel size={14} />,
  Nature: <Leaf size={14} />,
  Environment: <Leaf size={14} />,
  Philosophy: <Lightbulb size={14} />,
  Ideas: <Lightbulb size={14} />,
  Other: <Sparkles size={14} />,
};

const categoryStyles: Record<string, { bg: string; text: string }> = {
  Science: { bg: "bg-[#D0F0EB]/40", text: "text-[#0F766E]" },
  History: { bg: "bg-[#FDF2E9]/40", text: "text-[#8B4513]" },
  Psychology: { bg: "bg-[#FDE2F3]/40", text: "text-[#C71585]" },
  Technology: { bg: "bg-[#E8F0FE]/40", text: "text-[#1A73E8]" },
  Nature: { bg: "bg-[#E0F5E9]/40", text: "text-[#2E7D32]" },
  Literature: { bg: "bg-[#FDF6EC]/40", text: "text-[#6A4E3A]" },
  Geography: { bg: "bg-[#E0F7FA]/40", text: "text-[#00796B]" },
  Other: { bg: "bg-[#F3F3F3]/40", text: "text-[#333]" },
};

function TILCard({ til }: { til: TIL }) {
  const router = useRouter();
  const session = useSession();

  const currentUserId = session?.user?.id;
  const userIsPremium = true; // TODO: Replace with actual logic
  const isOwner = til.user_id === currentUserId;

  const handleAuthPrompt = (action: string) => {
    toast(`🔒 Sign in to ${action}`);
  };

  const handleDeleteTIL = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this TIL?");
    if (!confirmed) return;

    const res = await fetch(`/api/tils/delete?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("TIL deleted.");
      router.refresh();
    } else {
      toast.error("Error deleting TIL.");
    }
  };

  const theme = categoryStyles[til.category] || categoryStyles["Other"];
  const icon = categoryIcons[til.category] || categoryIcons["Other"];

  let username = "anonymous";
let avatarUrl: string | undefined = undefined;

if (typeof til.user === "object" && til.user !== null) {
  username = til.user.username?.trim() || til.user.name?.trim() || "anonymous";
  avatarUrl = til.user.avatar_url;
}

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow border border-gray-200 p-4 space-y-3 transform transition hover:-translate-y-1 hover:shadow-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={username}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#1F1F1F]">@{username}</span>
            {til.created_at && (
              <span className="text-xs text-gray-400">
                {new Date(til.created_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <MoreOptionsMenu
          isOwner={isOwner}
          isPremium={userIsPremium}
          onDelete={() => handleDeleteTIL(til.id)}
          onEdit={() => toast("🔒 Edit is a Premium feature")}
        />
      </div>

      {/* Content + Image */}
      <div className="flex justify-between gap-4">
        <div className="flex-1 text-base leading-relaxed text-[#1F1F1F]">{til.content}</div>
        {til.imageUrl && (
          <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
            <Image
              src={til.imageUrl}
              alt="TIL Image"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>

      {/* Category & Source */}
      <div className="flex flex-wrap items-center justify-between text-xs">
        <span
          className={`flex items-center gap-1 px-2 py-1 rounded-full font-medium ${theme.bg} ${theme.text}`}
        >
          {icon} {til.category}
        </span>
        {til.sourceUrl && (
          <Link
            href={til.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#555] hover:text-black"
          >
            Source ↗
          </Link>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-gray-500 text-sm">
        <button onClick={() => handleAuthPrompt("like TILs")} className="hover:text-black">
          <Heart size={18} />
        </button>
        <button onClick={() => handleAuthPrompt("comment")} className="hover:text-black">
          <MessageCircle size={18} />
        </button>
        <div
          className="flex items-center gap-2 hover:text-black cursor-pointer"
          onClick={() => handleAuthPrompt("save this to your knowledge bank")}
        >
          <Brain size={18} />
          {til.addedByCount && til.addedByCount > 0 && (
            <span>
              Added by {til.addedByCount} other{til.addedByCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <button onClick={() => handleAuthPrompt("share this")} className="hover:text-black">
          <Share size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default TILCard;
