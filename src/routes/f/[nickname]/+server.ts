import { supabase } from "$src/lib/db/supabaseClient";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types.js";

// Call this function to redirect to the new URL

export const GET = (async ({ params }) => {
  const { nickname } = params;
  console.log(`? Request for ${nickname}`)

  const { data } = await supabase
    .from('url_nicknames')
    .select('url')
    .eq('nickname', nickname)
    .limit(1)
    .maybeSingle()
  
  console.log(`${data?.url ? '✓' : 'x'} Found: ${data?.url}`)

  let redir_url = data?.url || '/';

  console.log(`↩️ Routing to ${redir_url}`)

  if (redir_url==='/') {
    throw redirect(307, redir_url)
  }
  
  if (!redir_url.includes('http')) {
    redir_url = 'http://' + redir_url;
  }  
  throw redirect(307, redir_url);
}) satisfies RequestHandler
