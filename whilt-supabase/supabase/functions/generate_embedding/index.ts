/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const { input, id } = await req.json();

    if (!input || !id) {
      return new Response(
        JSON.stringify({ error: "Missing input or id" }),
        { status: 400 }
      );
    }

    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!openaiKey || !supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing env vars", { openaiKey, supabaseUrl, supabaseServiceRoleKey });
      return new Response(
        JSON.stringify({ error: "Missing environment variables" }),
        { status: 500 }
      );
    }

    const embeddingResponse = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input,
        model: "text-embedding-ada-002",
      }),
    });

    if (!embeddingResponse.ok) {
      const err = await embeddingResponse.text();
      console.error("OpenAI error", err);
      return new Response(
        JSON.stringify({ error: "Failed to get embedding", detail: err }),
        { status: 500 }
      );
    }

    const responseData = await embeddingResponse.json();
    const embedding = responseData?.data?.[0]?.embedding;

    if (!embedding) {
      console.error("No embedding returned", responseData);
      return new Response(
        JSON.stringify({ error: "No embedding returned" }),
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    const { error } = await supabase
      .from("tils")
      .update({ embedding })
      .eq("id", id);

    if (error) {
      console.error("Supabase error", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    console.log("✅ Embedding saved for TIL ID:", id);

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("❌ Crash in function", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
});
