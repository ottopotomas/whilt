import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // for dynamic routing
import { supabase } from '../../../../lib/supabase'; // Adjust path if necessary
import CommentSection from '../../../components/CommentSection'; // Adjust path if necessary

const TilPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter 'id'
  
  const [til, setTil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch TIL data based on the dynamic ID
  useEffect(() => {
    if (!id) return; // Wait until 'id' is available

    const fetchTil = async () => {
      const { data, error } = await supabase
        .from('tils')
        .select('*')
        .eq('id', id)
        .single(); // Fetch only one record

      if (error) {
        console.error('Error fetching TIL:', error);
      } else {
        setTil(data);
      }
      setLoading(false); // Set loading to false once the data is fetched
    };

    fetchTil();
  }, [id]); // Re-run effect when 'id' changes

  if (loading) return <p>Loading...</p>; // Show loading state while fetching data

  if (!til) return <p>Sorry, no TIL found for this ID.</p>; // If no TIL is found for the ID

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{til.question}</h1>
      <p className="mt-2 text-gray-700">{til.answer}</p>
      <p className="mt-1 text-sm text-gray-500">Category: {til.category}</p>
      <CommentSection tilId={til.id} /> {/* Pass TIL ID to the comment section */}
    </div>
  );
};

export default TilPage;
