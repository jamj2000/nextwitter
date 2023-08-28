import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { type Database } from "@/types/database"

export function NewTweet (){

    async function addTweet (formData: FormData){
        'use server'
        const title = String(formData.get('title'))   
             const supabase = createServerComponentClient<Database>({cookies})

        const { data: {user}} = await supabase.auth.getUser()

        if (user) {
            await supabase.from('tweets').insert({title, user_id: user.id})
        }
        revalidatePath('/')
    }

    return (
        <form action={addTweet}>
            <input name="title" className="bg-light border-2" placeholder="¿En qué estás pensando?" />
        </form>

    )
}