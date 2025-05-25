'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import type { Comment } from '../../../lib/types';
import type { TIL } from '../../../lib/types';

export default function TILDetailPage() {
  const { slug } = useParams();
  const [til, setTil] = useState<TIL | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTIL = async () => {
      const { data, error } = await supabase
        .from('tils')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        toast.error('TIL not found.');
        setLoading(false);
        return;
      }

      setTil(data);
      fetchComments(data.id);
      setLoading(false);
    };

    const fetchComments = async (tilId: string) => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('til_id', tilId)
        .order('created_at', { ascending: true });

      if (!error) {
        setComments(data);
      }
    };

    if (slug) fetchTIL();
  }, [slug]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !til) return;

    const { error } = await supabase.from('comments').insert({
      til_id: til.id,
      user_id: til.user_id, // Replace with current user ID once auth is added
      content: newComment,
    });

    if (error) {
      toast.error('Failed to add comment.');
    } else {
      toast.success('Comment added!');
      setNewComment('');

      const { data: updatedComments } = await supabase
        .from('comments')
        .select('*')
        .eq('til_id', til.id)
        .order('created_at', { ascending: true });

      setComments(updatedComments ?? []);
    }
  };

  if (loading) return <p className="p-4">Loading TIL...</p>;
  if (!til) return <p className="p-4 text-red-600">TIL not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">
          {format(new Date(til.created_at), 'PP')}
        </p>
        <h1 className="text-xl font-semibold">{til.content}</h1>
        {til.category && (
          <p className="text-sm mt-2">
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

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Comments</h2>
        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="mb-2 border-b pb-1">
            <p className="text-sm">{c.content}</p>
            <p className="text-xs text-gray-400">
              {format(new Date(c.created_at), 'PPP')}
            </p>
          </div>
        ))}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Add a comment..."
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

const getCategoryEmoji = (category: string): string => {
  const map: { [key: string]: string } = {
  Mindset: '🧠',
  Productivity: '⚡',
  Science: '🔬',
  Tech: '💻',
  'Words & Language': '🗣️',
  Finance: '💰',
  History: '🏛️',
  Business: '📊',
  Philosophy: '🧘',
  Culture: '🌍',
  Health: '🏃',
  Relationships: '❤️',
  'Random Fact': '🎲',
  Quotes: '📝',
  };
  return map[category] || '📘';
};

