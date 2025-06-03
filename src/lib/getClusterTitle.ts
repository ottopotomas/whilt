import type { TIL } from "./types";

export function getClusterTitle({
  parent,
  children,
}: {
  parent?: TIL;
  children: TIL[];
}): string {
  if (parent) return `Follow-up to: ${parent.content}`;
  if (children?.length) return "This TIL inspired others:";
  return "This TIL stands on its own.";
}
