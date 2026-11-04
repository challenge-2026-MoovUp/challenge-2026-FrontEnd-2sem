export interface FeedAuthor {
    id: string
    name: string
    handle: string
    initials: string
    /** Classe de cor/gradiente do avatar (tokens do tema). */
    avatarClass: string
}

export interface FeedReply {
    id: string
    author: FeedAuthor
    time: string
    content: string
}

export interface FeedPost {
    id: string
    author: FeedAuthor
    time: string
    content: string
    likes: number
    replies: FeedReply[]
}

export type SuggestedProfile = FeedAuthor & { bio: string }
