import TILCard from "./til/TILCard"; // or your actual TIL feed component
import { getRecentTILs } from "@/lib/data"; // server-side function to fetch TILs

export default async function HomePage() {
  const tils = await getRecentTILs(); // Fetch from DB or static list

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">
        what have i learned today?
      </h1>
      <p className="text-muted-foreground text-center mb-10">
        Explore new insights or add your own.
      </p>

      <div className="grid gap-6">
        {tils.length === 0 ? (
          <p className="text-center text-muted-foreground">No TILs yet.</p>
        ) : (
          tils.map((til) => <TILCard key={til.id} til={til} />)
        )}
      </div>
    </main>
  );
}
