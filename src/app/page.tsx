// src/app/page.tsx
'use client';

import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/home');
  return null; // fallback in case redirect doesn't execute immediately
}
