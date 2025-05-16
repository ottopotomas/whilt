"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function TILForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(true); // default to public
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) return;

    setLoading(true);

    const { error } = await supabase.from("tils").insert([
      {
        question,
        answer,
        category,
        is_public: isPublic,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Something went wrong: " + error.message);
    } else {
      setSuccess(true);
      setQuestion("");
      setAnswer("");
      setCategory("");
      setIsPublic(true); // reset to public by default
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Add a New TIL</h2>

      <label className="block mb-2 font-medium">Question</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        placeholder="What did you learn?"
        required
      />

      <label className="block mb-2 font-medium">Answer</label>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Write a short explanation..."
        rows={4}
        required
      />

      <label className="block mb-2 font-medium">Category (optional)</label>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        placeholder="e.g. Science, Business"
      />

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={!isPublic}
          onChange={() => setIsPublic(!isPublic)}
          className="mr-2"
        />
        Make this TIL private
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Saving..." : "Submit TIL"}
      </button>

      {success && (
        <p className="mt-4 text-green-600 font-medium">
          ✅ TIL saved successfully!
        </p>
      )}
    </form>
  );
}
