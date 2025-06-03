'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { TIL } from '@/lib/types';

type Props = {
  til: TIL;
};

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function ExpandedTILCard({ til }: Props) {
  // Normalize user
  const user = typeof til.user === 'string' ? { username: til.user } : til.user ?? {};
  const username = user?.username || 'unknown';
  const avatarUrl = user?.avatar_url;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow">
      {/* Header */}
      <div className="flex items-center gap-3 text-sm text-gray-600">
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
            <div className="w-full h-full bg-gray-300 rounded-full" />
          )}
        </div>
        <span className="font-medium">@{username}</span>
        {til.created_at && (
          <span className="text-gray-400">· {formatDate(til.created_at)}</span>
        )}
      </div>

      {/* TIL Content */}
      <p className="text-lg leading-relaxed text-[#1F1F1F] whitespace-pre-wrap">
        {til.content}
      </p>

      {/* Image */}
      {til.imageUrl && (
        <div className="overflow-hidden rounded-xl">
          <Image
            src={til.imageUrl}
            alt="TIL visual"
            width={800}
            height={450}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Sources */}
      {(til.sourceUrl || (til.sources && til.sources.length > 0)) && (
        <div className="pt-3">
          <p className="text-sm font-medium text-gray-700 mb-2">📚 Sources</p>
          <ul className="space-y-1 text-sm text-blue-600">
            {til.sources?.map((src, i) => (
              <li key={i}>
                <Link
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {src.title || src.url}
                </Link>
              </li>
            ))}
            {til.sourceUrl && (
              <li>
                <Link
                  href={til.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {til.sourceUrl}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
