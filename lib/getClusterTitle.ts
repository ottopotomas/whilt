import type { TIL } from "../types/til";

export async function getClusterTitle(params: {
  parent?: { content: string };
  children?: { content: string }[];
}): Promise<string> {
  const { parent, children } = params;

  const hasCluster = parent || (children && children.length > 0);
  if (!hasCluster) return "";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ai-categorise/cluster-title`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parent: parent || null,
        children: children || [],
      }),
      cache: "no-store",
    });

    const data = await res.json();
    return data.title || "Learning Cluster";
  } catch (error) {
    console.error("Error fetching cluster title:", error);
    return "Learning Cluster";
  }
}
