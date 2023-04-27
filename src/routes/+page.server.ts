import { supabase } from '$src/lib/db/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({url}) => {
    const url_nicknames = await supabase.from('url_nicknames')
    .select('*')
    const {origin} = url
    return { url_nicknames , origin }
};

export const actions = {
    default: async ({request}) => {
        const formData = await request.formData();
        const url = (formData.get('url') as string).toLowerCase();
        const nickname = (formData.get('nickname') as string).toLowerCase();
        console.log(`➕ Request to add ${url} as ${nickname}`)
        const { error } = await supabase
            .from('url_nicknames')
            .insert([
                { url, nickname },
            ])
        
        if (error) {
            console.error(`❌ ${error}`)
            return { success: false, error}
        } else {
            console.log(`✅ Successfully added ${url} as ${nickname}`)
            return { success: true, nickname, url}
        }
    }
} satisfies Actions;