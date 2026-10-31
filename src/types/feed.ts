export interface FeedAuthor {
    id: string
    name: string
    handle: string
    initials: string
    /** Classe de cor/gradiente do avatar (tokens do tema). */
    avatarClass: string
    verified?: boolean
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
    tags: string[]
    likes: number
    reposts: number
    replies: FeedReply[]
    /** Dado numérico em destaque dentro do post (resgate, desafio, parceria). */
    stat?: {
        icon: 'bolt' | 'train' | 'coins' | 'trophy'
        value: string
        label: string
    }
}

export interface TrendTopic {
    tag: string
    posts: string
}

export interface SuggestedProfile extends FeedAuthor {
    bio: string
}
