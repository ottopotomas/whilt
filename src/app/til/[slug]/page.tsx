import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";

import {
  getTILBySlug,
  getLinkedTILs,
  getSuggestedCapyTIL,
  getTILComments,
} from "../../../lib/data";
import { getCategoryEmoji } from "../../../lib/getCategoryEmoji";
import { getClusterTitle } from "../../../lib/getClusterTitle";

import ExpandedTILCard from "@/components/ExpandedTILCard";
import RelatedTILBlock from "@/components/RelatedTILBlock";
import CommentThread from "@/components/CommentThread";

type Props = {
  params: { slug: string };
};

export default async function TILPage({ params }: Props) {
  const til = await getTILBySlug(params.slug);
  if (!til) return notFound();

  const [linkedTILs, capySuggestion, comments] = await Promise.all([
    getLinkedTILs(til.id),
    getSuggestedCapyTIL(til),
    getTILComments(til.id),
  ]);

  const clusterTitle = await getClusterTitle({
    parent: linkedTILs.parent || undefined,
    children: linkedTILs.children,
  });

  const normalizedComments = comments.map((comment) => ({
    ...comment,
    user:
      typeof comment.user === "string"
        ? { username: comment.user }
        : comment.user ?? { username: "unknown" },
    content: comment.content,
  }));

  return (
    <main className="max-w-xl mx-auto px-4 py-6 space-y-6">
      <Link href="/home" className="text-sm text-blue-600 hover:underline">
        ← Back to Feed
      </Link>

      {/* Expanded TIL Card */}
      <ExpandedTILCard til={til} />

      {/* Optional category + source fallback */}
      <div className="bg-white p-4 rounded shadow">
        {til.created_at && (
          <p className="text-sm text-gray-500">
            {format(new Date(til.created_at), "PP")}
          </p>
        )}
        {til.category && (
          <p className="text-sm mt-1">
            <span className="mr-1">{getCategoryEmoji(til.category)}</span>
            {til.category}
          </p>
        )}
        {til.source && (
          <a
            href={til.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm underline mt-2 inline-block"
          >
            Source
          </a>
        )}
      </div>

      {/* Related TILs and Capy Suggestion */}
      <RelatedTILBlock
        parent={linkedTILs.parent}
        children={linkedTILs.children}
        capySuggestion={capySuggestion}
        clusterTitle={clusterTitle}
      />

      {/* Comment Section */}
      <CommentThread tilId={til.id} comments={normalizedComments} />
    </main>
  );
}
