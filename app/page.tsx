import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import { AuthButtonServer } from './auth-button-server'
import { redirect } from 'next/navigation';
import { NewTweet } from './new-tweet';
import { Tweets } from './tweets';


export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  let { data: { session } } = await supabase.auth.getSession()  // s.data.session

  if (!session) { redirect('/login') }

  const { data } = await supabase
    .from("tweets")
    .select("*, author: profiles(*), likes(user_id)");

  const tweets = data?.map(tweet => ({
    ...tweet,
    author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    user_has_liked_tweet: tweet.likes.find(item => item.user_id === session?.user.id),
    likes: tweet.likes.length   
  })) ?? []
 
  //  tweets?.forEach(element => {
  //    console.log(element.likes)
  //  });
  // console.log("Query.data (alias tweets) ", tweets)

  return (
    <main>
      <AuthButtonServer />
      <NewTweet />
      <Tweets tweets={tweets} />
    </main>
  )
}
