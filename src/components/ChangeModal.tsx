"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  fieldLabel?: string;
  onSubmit: (value?: string) => void;
  onClose: () => void;
  hideInput?: boolean;
  confirmText?: string;
  danger?: boolean;
  children?: React.ReactNode;
};

export function ChangeModal({
  title,
  fieldLabel,
  onSubmit,
  onClose,
  hideInput = false,
  confirmText = "Save",
  danger = false,
  children,
}: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        {/* Optional Explanatory Children */}
        {children && <div className="mb-4 text-sm text-gray-600">{children}</div>}

        {/* Optional Input */}
        {!hideInput && (
          <>
            {fieldLabel && (
              <label className="block text-sm mb-2 text-gray-600">{fieldLabel}</label>
            )}
            <input
              type={
                fieldLabel?.toLowerCase().includes("password")
                  ? "password"
                  : "email"
              }
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(hideInput ? undefined : value);
              onClose();
            }}
            className={`px-4 py-2 text-sm rounded-md ${
              danger
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
