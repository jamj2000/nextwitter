'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export function Likes ({ tweet, addOptTweet }: { tweet: TweetWithAuthor, addOptTweet: (newTweet: TweetWithAuthor) => void }) {
  const router = useRouter()
  async function handleLikes () {
    const supabase = createClientComponentClient<Database>()
    const { data: { user } } = await supabase.auth.getUser()

    if (user != null) {
      if (tweet.user_has_liked_tweet) {
        // dislike
        addOptTweet({
          ...tweet,
          likes: tweet.likes - 1,
          user_has_liked_tweet: !tweet.user_has_liked_tweet
        })
        await supabase.from('likes')
          .delete()
          .match({ user_id: user?.id, tweet_id: tweet.id })
      } else {
        // like
        addOptTweet({
          ...tweet,
          likes: tweet.likes + 1,
          user_has_liked_tweet: !tweet.user_has_liked_tweet
        })
        await supabase
          .from('likes')
          .insert({ user_id: user?.id, tweet_id: tweet.id })
      }
    }
    router.refresh()
  }

  return (
        <button
            className="border-y-2"
            onClick={handleLikes}>{tweet.likes} Likes
        </button>
  )
}
