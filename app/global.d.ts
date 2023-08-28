import { Database as DB } from '@/app/types/database';

type TweetEntity = DB['public']['Tables']['tweets']['Row']
type ProfileEntity = DB['public']['Tables']['profiles']['Row']

declare global {
    type Database = DB;

    type TweetWithAuthor = TweetEntity & {
        author: ProfileEntity,
        likes: number,
        user_has_liked_tweet: boolean
    }

}