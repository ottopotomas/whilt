'use client';

import React from 'react';
import TILCard from '@/app/til/TILCard';
import type { TIL } from '@/lib/types';

type RelatedTILBlockProps = {
  parent?: TIL | null;
  children: TIL[];
  capySuggestion?: TIL | null;
  clusterTitle?: string;
};

export default function RelatedTILBlock({
  parent,
  children,
  capySuggestion,
  clusterTitle,
}: RelatedTILBlockProps) {
  const hasCluster = Boolean(parent || children.length > 0);
  const showCapySuggestion = !hasCluster && !!capySuggestion;

  if (!hasCluster && !capySuggestion) return null;

  return (
    <section className="space-y-4">
      {clusterTitle && (
        <h3 className="text-sm text-gray-600 font-semibold border-b border-gray-100 pb-1">
          🧠 {clusterTitle}
        </h3>
      )}

      {parent && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Parent TIL</p>
          <TILCard til={parent} />
        </div>
      )}

      {children.length > 0 && (
        <div>
          {parent && (
            <p className="text-xs text-gray-500 mt-4 mb-1">Related TILs</p>
          )}
          <div className="space-y-3">
            {children.map((child) => (
              <TILCard key={child.id} til={child} />
            ))}
          </div>
        </div>
      )}

      {showCapySuggestion && (
        <div className="mt-4 border-t pt-4 border-gray-100">
          <p className="text-xs text-gray-500 mb-2">
            💡 Capy suggests this related idea (Premium Feature)
          </p>
          <TILCard til={capySuggestion} />
        </div>
      )}
    </section>
  );
}
