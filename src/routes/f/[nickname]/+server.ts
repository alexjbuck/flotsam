import { supabase } from "$src/lib/db/supabaseClient";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types.js";

// Call this function to redirect to the new URL

export const GET = (async ({ params, url }) => {
  const { nickname } = params;

  const { data } = await supabase
    .from('url_nicknames')
    .select('url')
    .eq('nickname', nickname)
  const res = data?.reduce((p, n) => { return n }, { url: '/' });
  let redir_url = res?.url || '/';

  if (!redir_url.includes('http')) {
    redir_url = 'http://' + redir_url;
  }

  throw redirect(308, redir_url);

}) satisfies RequestHandler
