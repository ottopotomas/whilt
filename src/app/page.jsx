"use client";
import React, { useState } from "react";

export default function Page() {
  const [tils, setTils] = useState([
    {
      id: 1,
      user: { name: 'Jake Williams', email: 'jake@mail.com' },
      question: 'Acquiescence',
      answer: 'The reluctant acceptance of something without protest.',
      category: 'Vocabulary',
      votes: 12,
      comments: 3,
      time: '2 hours ago',
    },
    {
      id: 2,
      user: { name: 'Sophia Ryan', email: 'sophia@mail.com' },
      question: 'Intel',
      answer: 'Intel was founded in 1968.',
      category: 'History',
      votes: 8,
      comments: 1,
      time: '3 hours ago',
    },
  ]);

  return (
    <main className="bg-gray-50 min-h-screen py-8 px-4">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-teal-600">
          w<span className="relative">
            h<span className="inline-block text-teal-600 animate-pulseGlow">i</span>lt
            <span className="absolute left-1 top-[-8px] text-3xl">💡</span>
          </span>?
        </h1>
        <p className="text-gray-500 text-lg mt-2">what have i learned today</p>
      </header>

      {/* TIL Form */}
      <section className="bg-white max-w-xl mx-auto shadow-md rounded-xl p-6 mb-10">
        <label htmlFor="til-input" className="block text-lg font-semibold mb-2">
          today i learned
        </label>
        <textarea
          id="til-input"
          className="w-full border border-gray-300 rounded-md p-3 mb-4"
          rows="3"
          placeholder="e.g. photosynthesis / the process by which plants make energy"
        ></textarea>
        <div className="flex items-center justify-between">
          <label className="inline-flex items-center">
            <input type="checkbox" className="mr-2" />
            Make this TIL private
          </label>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700">
            ADD TIL
          </button>
        </div>
      </section>

      {/* Feed */}
      <section className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Trending TILs</h2>
        {tils.map((til) => (
          <article key={til.id} className="bg-white rounded-xl shadow-md p-5 mb-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold">{til.user.name}</p>
                <p className="text-sm text-gray-500">{til.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">⬆️ {til.votes}</p>
              </div>
            </div>
            <p className="font-medium text-teal-600 mb-1">TIL:</p>
            <p><strong>Concept:</strong> {til.question}</p>
            <p><strong>Answer:</strong> {til.answer}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">#{til.category.toLowerCase()}</span>
              <button className="text-sm text-teal-600 hover:underline">ADD TIL</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
