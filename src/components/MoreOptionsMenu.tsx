"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

type Props = {
  isOwner: boolean;
  isPremium?: boolean;
  onDelete: () => void;
  onEdit?: () => void;
};

export default function MoreOptionsMenu({ isOwner, isPremium, onDelete, onEdit }: Props) {
  const [open, setOpen] = useState(false);

  if (!isOwner) return null;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="text-gray-500 hover:text-black">
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md text-sm">
          <button
            onClick={() => {
              if (onEdit) onEdit();
              setOpen(false);
            }}
            className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
              isPremium ? "" : "text-gray-300 cursor-not-allowed"
            }`}
            disabled={!isPremium}
          >
            ✏️ Edit TIL
          </button>
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}
