# A very bad fake clone of Twitter


## Referencias

- https://egghead.io/courses/build-a-twitter-clone-with-the-next-js-app-router-and-supabase-19bebadb
- https://youtu.be/V_kD2q_aoy8?si=Fo_6bICNGt2GqWAh
- https://supabase.com/docs/guides/auth/auth-helpers/nextjs


---

## Funciones de supabase

```typescript
// En servidor
const supabase = createServerComponentClient( {cookies})
let {data: {session}} = await supabase.auth.getSession()  // s.data.session
const query = await supabase.from("tweets").select(); // Select en tabla tweets




// En cliente
const supabase = createClientComponentClient()
await supabase.auth.signInWithOAuth(credenciales)
await supabase.auth.signOut()
await supabase.auth.getUser()
```

## Generar tipos de la BD para typescript

```bash
pnpx supabase login
mkdir lib
pnpx supabase gen types typescript --project-id eliddelproyecto > lib/database.types.ts
```
