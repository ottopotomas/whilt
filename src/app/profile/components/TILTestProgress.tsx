"use client";

import { Sparkles, FileText } from "lucide-react";

type Props = {
  stage: number;          // 1 to 5
  isPassed?: boolean;
  essayAvailable?: boolean;
};

export default function TILTestProgress({ stage, isPassed, essayAvailable }: Props) {
  const progress = `Test ${stage}/5`;

  return (
    <div className="text-xs flex items-center gap-2 mt-1 text-gray-600">
      <span>{progress}</span>
      {isPassed && (
        <span className="text-green-600 font-semibold">• Passed</span>
      )}
      {essayAvailable && (
        <span className="flex items-center gap-1 text-yellow-600 font-medium">
          <FileText size={12} /> Essay Challenge
        </span>
      )}
    </div>
  );
}
