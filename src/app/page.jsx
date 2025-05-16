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
        <label htmlFor="til-question" className="block text-lg font-semibold mb-2">
          today i learned
        </label>
        <input
          type="text"
          id="til-question"
          className="w-full border border-gray-300 rounded-md p-3 mb-4"
          placeholder="e.g. Photosynthesis"
        />
        <textarea
          id="til-answer"
          className="w-full border border-gray-300 rounded-md p-3 mb-4"
          rows="3"
          placeholder="e.g. The process by which plants convert sunlight into energy."
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
          <article key={til.id} className="bg-white rounded-xl shadow-md p-6 mb-6 transition hover:shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold">
                {til.user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{til.user.name}</p>
                <p className="text-xs text-gray-500">{til.time}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-400 uppercase tracking-wide font-medium mb-1">TIL</p>
              <p className="text-md font-semibold text-gray-900 mb-1">Concept:</p>
              <p className="text-lg font-medium text-gray-900">{til.question}</p>
              <p className="text-md font-semibold text-gray-900 mt-3 mb-1">Answer:</p>
              <p className="text-gray-700 text-sm">{til.answer}</p>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                #{til.category.toLowerCase()}
              </span>
              <div className="flex items-center gap-4">
                <button className="hover:text-teal-600">⬆️ {til.votes}</button>
                <button className="hover:text-teal-600">💬 {til.comments}</button>
                <button className="text-teal-600 font-semibold hover:underline">ADD TIL</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
