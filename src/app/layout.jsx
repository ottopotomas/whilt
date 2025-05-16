export const metadata = {
  title: "whilt",
  description: "what have i learned today?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans">
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold text-teal-600">
            whilt<span className="animate-pulseGlow">?</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">what have i learned today?</p>
        </header>
        {children}
      </body>
    </html>
  );
}
