import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { parent, children } = body as {
      parent?: { content: string };
      children?: { content: string }[];
    };

    const allContent = [
      parent?.content,
      ...(children || []).map((c) => c.content),
    ]
      .filter(Boolean)
      .join("\n");

    if (!allContent) {
      return NextResponse.json({ title: "Learning Cluster" });
    }

    const prompt = `You are naming a group of related "Today I Learned" (TIL) posts. Here's the content:\n\n${allContent}\n\nCreate a short, intelligent cluster title (max 6 words) that captures the shared theme. No quotation marks.`;

    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }],
    });

    const result = chat.choices[0]?.message?.content?.trim();

    return NextResponse.json({ title: result || "Learning Cluster" });
  } catch (error) {
    console.error("Cluster title error:", error);
    return NextResponse.json({ title: "Learning Cluster" }, { status: 500 });
  }
}
