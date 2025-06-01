import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai"; // optional streaming
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  const { name, rarity, linkedTilContent } = await req.json();

  const prompt = `
You're a whimsical archivist who writes lore for magical learning artifacts.

Item: ${name}
Rarity: ${rarity}
Inspired by this learning: "${linkedTilContent}"

Write a short, clever lore blurb for this item that feels unique and rich in personality.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: [
      { role: "system", content: "You are a creative fantasy writer." },
      { role: "user", content: prompt }
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
