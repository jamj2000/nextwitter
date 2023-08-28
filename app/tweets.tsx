'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Likes } from "./likes";
import { useEffect, experimental_useOptimistic as useOptimistic } from 'react';
import { useRouter } from "next/navigation";

export function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
    const router = useRouter()

    const [optTweets, addOptTweet] = useOptimistic<TweetWithAuthor[], TweetWithAuthor>(tweets, (currOptTweets, newTweet) => {
        const newOptTweets = [...currOptTweets]
        const index = newOptTweets.findIndex(tweet => tweet.id === newTweet.id)
        newOptTweets[index] = newTweet
        return newOptTweets
    })

    const supabase = createClientComponentClient()

    useEffect(() => {
        const channel = supabase.channel('tweets en tiempo real')
            .on('postgres_changes', {
                event: "*",
                schema: 'public',
                table: 'tweets'
            },
                (payload) => {  router.refresh() }).subscribe()
        return () => { supabase.removeChannel(channel); }
    }, [supabase, router])

    return tweets.map((tweet) => (
        <div key={tweet.id}>
            <p>{tweet.author?.name} {tweet.author?.username}</p>
            <p>{tweet.title}</p>
            <Likes tweet={tweet} addOptTweet={addOptTweet} />
        </div>
    ))
}