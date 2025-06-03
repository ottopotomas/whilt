import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { til } = await req.json();

  if (!til) {
    return NextResponse.json({ error: "Missing TIL text" }, { status: 400 });
  }

  const prompt = `Classify this TIL into one of the following categories:
- Science
- History
- Technology
- Philosophy
- Psychology
- Language & Etymology
- Society & Culture
- Art & Design
- Literature & Writing
- Math & Logic
- Health & Medicine
- Business & Economics
- Geography & Nature
- Other

TIL: "${til}"

Respond ONLY with the category name.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  const category = completion.choices[0].message.content?.trim();

  return NextResponse.json({ category });
}
