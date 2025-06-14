import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js"

serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )

  const { error } = await supabase.rpc("lock_old_tils")

  if (error) {
    console.error("❌ Failed to lock TILs:", error)
    return new Response("Error locking TILs", { status: 500 })
  }

  console.log("✅ Old TILs locked successfully")
  return new Response("TILs locked", { status: 200 })
})
