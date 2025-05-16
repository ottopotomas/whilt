export const metadata = {
  title: "WHILT",
  description: "What Have I Learned Today?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
