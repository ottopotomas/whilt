// src/app/til/[id]/page.tsx

import { useRouter } from "next/router";
import { supabase } from "../../../../lib/supabase";
import CommentSection from "../../../components/CommentSection";

export default function TilPage() {
  const router = useRouter();
  const { id } = router.query;

  // Wait for the `id` to be available before trying to fetch the TIL
  if (!id) {
    return <div>Loading...</div>;
  }

  const [til, setTil] = React.useState(null);

  // Fetch TIL from the database
  React.useEffect(() => {
    const fetchTIL = async () => {
      const { data, error } = await supabase
        .from("tils")
        .select("*")
        .eq("id", id)
        .single(); // `.single()` ensures only one record is returned

      if (error) {
        console.error("Error fetching TIL:", error);
      } else {
        setTil(data);
      }
    };

    fetchTIL();
  }, [id]); // Refetch when `id` changes

  // Handle the case when the TIL isn't loaded yet
  if (!til) {
    return <div>Loading TIL data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{til.question}</h1>
      <p className="mt-2 text-gray-700">{til.answer}</p>
      <p className="mt-1 text-sm text-gray-500">Category: {til.category}</p>
      
      <CommentSection tilId={til.id} />
    </div>
  );
}
