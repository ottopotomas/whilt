'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../../lib/supabase';
import { startOfToday } from 'date-fns';
import toast from 'react-hot-toast';

const TILForm = ({ userId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTodaysManualTILCount = async () => {
    const { data, error } = await supabase
      .from('tils')
      .select('id')
      .eq('user_id', userId)
      .eq('source', 'manual')
      .eq('is_draft', false)
      .gte('created_at', startOfToday().toISOString());

    if (error) {
      console.error('Error counting TILs:', error.message);
      return 0;
    }

    return data?.length || 0;
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    const isPremium = profile?.is_premium;

    const tilCount = await getTodaysManualTILCount();

    if (tilCount === 5) {
      toast("You've logged 5 TILs today. Great progress! Remember to reflect.");
    }

    if (tilCount === 8) {
      toast("You're nearing your 10-TIL limit. Consider saving the rest as drafts.");
    }

    if (tilCount >= 10) {
      toast.error("You've hit your 10-TIL limit for today.");
      const confirmed = confirm('Would you like to save this TIL as a draft?');
      if (confirmed) {
        const { error: draftError } = await supabase.from('tils').insert({
          user_id: userId,
          content: data.content,
          source: 'manual',
          is_draft: true,
        });

        if (draftError) {
          toast.error('Failed to save draft.');
        } else {
          toast.success('Draft saved. Come back tomorrow to publish it.');
          reset();
        }
      }
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from('tils').insert({
      user_id: userId,
      content: data.content,
      source: 'manual',
      is_draft: false,
    });

    if (error) {
      toast.error('Failed to submit TIL.');
    } else {
      toast.success('TIL submitted!');
      reset();
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <textarea
        {...register('content', { required: true })}
        placeholder="Today I learned..."
        className="w-full p-2 rounded border"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? 'Submitting...' : 'Submit TIL'}
      </button>
    </form>
  );
};

export default TILForm;
