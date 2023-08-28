'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Session } from '@supabase/supabase-js'
import { useRouter } from "next/navigation"

export function AuthButtonClient({session}: {session: Session | null}) {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter();

    async function handleSingIn() {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: { redirectTo: 'http://localhost:3000/auth/callback' }
        })

    }
    async function handleSingOut() {
        await supabase.auth.signOut()
        router.refresh()
    }


    return session ? (
        <button onClick={handleSingOut}>Cerrar sesión</button>
        ) : (
        <button onClick={handleSingIn}>Iniciar sesión</button>
        )

}