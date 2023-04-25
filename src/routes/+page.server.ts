import { supabase } from '$src/lib/db/supabaseClient';
import type { Actions } from './$types';

export const actions = {
    default: async ({request}) => {
        console.log(request)
        const formData = await request.formData();
        const url = formData.get('url') as string;
        const nickname = formData.get('nickname') as string;
        console.log(url, nickname)

        const { error } = await supabase
            .from('url_nicknames')
            .insert([
                { url, nickname },
            ])
        
        if (error) {
            console.error(error)
            return { success: false, error}
        } else {
            return { success: true, nickname, url}
        }
    }
} satisfies Actions;