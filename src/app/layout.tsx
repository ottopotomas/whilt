import type { ReactNode } from "react";

export const metadata = {
  title: "whilt",
  description: "what have i learned today?",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
