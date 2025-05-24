import React from "react";
import { Heart, MessageCircle, Share, MoreHorizontal, Brain } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

type TIL = {
  id: string;
  user: string;
  avatarUrl?: string;
  content: string;
  category: string;
  imageUrl?: string;
  sourceUrl?: string;
};

function TILCard({ til }: { til: TIL }) {
  const handleAuthPrompt = (action: string) => {
    toast(`🔒 Sign in to ${action}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-4 space-y-3">
      {/* Image (if present) */}
      {til.imageUrl && (
        <div className="w-full overflow-hidden rounded-xl">
          <Image
            src={til.imageUrl}
            alt="TIL Image"
            width={800}
            height={400}
            className="object-cover w-full h-auto"
          />
        </div>
      )}

      {/* Header Row */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
          {til.avatarUrl ? (
            <Image src={til.avatarUrl} alt={til.user} width={36} height={36} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-full" />
          )}
        </div>
        <span className="text-sm font-semibold text-[#1F1F1F]">@{til.user}</span>
      </div>

      {/* Content */}
      <p className="text-base leading-relaxed text-[#1F1F1F]">{til.content}</p>

      {/* Category & Source */}
      <div className="flex flex-wrap items-center justify-between text-xs text-gray-500">
        <span className="bg-[#D0F0EB] px-2 py-1 rounded-full font-medium text-[#1F1F1F]">
          #{til.category}
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

      {/* Action Row */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-gray-500 text-sm">
        <button onClick={() => handleAuthPrompt("like TILs")} className="hover:text-black">
          <Heart size={18} />
        </button>
        <button onClick={() => handleAuthPrompt("comment")} className="hover:text-black">
          <MessageCircle size={18} />
        </button>
        <button onClick={() => handleAuthPrompt("save this to your knowledge bank")} className="hover:text-black">
          <Brain size={18} />
        </button>
        <button onClick={() => handleAuthPrompt("share this")} className="hover:text-black">
          <Share size={18} />
        </button>
        <button onClick={() => handleAuthPrompt("access more options")} className="hover:text-black">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}

export default TILCard;
