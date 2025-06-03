import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { name, rarity, linkedTilContent } = await req.json();

  const prompt = `
You're a whimsical archivist who writes lore for magical learning artifacts.

Item: ${name}
Rarity: ${rarity}
Inspired by this learning: "${linkedTilContent}"

Write a short, clever lore blurb for this item that feels unique and rich in personality.
  `;

  const result = streamText({
    model: openai('gpt-4'),
    system: 'You are a creative fantasy writer.',
    prompt,
  });

  return result.toDataStreamResponse();
}
