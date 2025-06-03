"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  til: {
    id: string;
    content: string;
    category: string;
  };
};

export default function EditTILModal({ isOpen, onClose, til }: Props) {
  const [newContent, setNewContent] = useState(til.content);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    const res = await fetch(`/api/tils/edit`, {
      method: "POST",
      body: JSON.stringify({ id: til.id, content: newContent }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast.success("TIL updated!");
      onClose();
    } else {
      toast.error("Failed to update TIL.");
    }

    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg space-y-4">
          <Dialog.Title className="text-lg font-semibold">Edit TIL</Dialog.Title>
          <textarea
            className="w-full border rounded-lg p-2 text-sm"
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleSave}
              disabled={loading}
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
