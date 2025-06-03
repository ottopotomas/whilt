'use client';

import Image from "next/image";
import React from "react";

interface CapyPopupProps {
  title: string;
  message: string;
  children: React.ReactNode;
  step?: number; // optional step indicator
  totalSteps?: number;
  onClose?: () => void;
}

export default function CapyPopup({
  title,
  message,
  children,
  step = 1,
  totalSteps = 6,
  onClose,
}: CapyPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center relative">
        {/* Capy Illustration */}
        <div className="flex justify-center mb-4">
          <Image
            src="/capy/capy-welcome.png"
            alt="Professor Capy"
            width={100}
            height={100}
          />
        </div>

        {/* Capy Header */}
        <h2 className="text-lg font-bold text-gray-800">
          <span role="img" aria-label="paw">🐾</span> Professor Capy welcomes you to WHILT!
        </h2>

        {/* Subheading */}
        <p className="text-sm text-[#E26D00] italic mt-1">what have i learned today?</p>

        {/* Main Message */}
        <p className="text-sm text-gray-600 mt-3">{message}</p>

        {/* Children / Action Button(s) */}
        <div className="mt-4">{children}</div>

        {/* Step Tracker */}
        <p className="text-xs text-gray-400 mt-6">{`${step} / ${totalSteps}`}</p>
      </div>
    </div>
  );
}
