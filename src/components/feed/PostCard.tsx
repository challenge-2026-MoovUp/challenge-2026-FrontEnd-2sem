import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
    faComment,
    faRetweet,
    faHeart,
    faBookmark,
    faCircleCheck,
    faBolt,
    faTrain,
    faCoins,
    faTrophy,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import type { FeedPost } from '../../types/feed'
import Avatar from './Avatar'
import { focusRing, softTransition } from '../common/uiStyles'

interface PostCardProps {
    post: FeedPost
    userId: string | null
    userName: string | null
    liked: boolean
    reposted: boolean
    saved: boolean
    activeTag: string | null
    onLike: (id: string) => void
    onRepost: (id: string) => void
    onSave: (id: string) => void
    onReply: (id: string, content: string) => void
    onTagClick: (tag: string) => void
}

const statIcons: Record<NonNullable<FeedPost['stat']>['icon'], IconDefinition> = {
    bolt: faBolt,
    train: faTrain,
    coins: faCoins,
    trophy: faTrophy,
}

/** Botão da barra de ações: cor de hover própria por ação, no estilo das redes sociais. */
function ActionButton({
    icon,
    label,
    count,
    active,
    activeClass,
    hoverClass,
    onClick,
}: {
    icon: IconDefinition
    label: string
    count?: number
    active?: boolean
    activeClass: string
    hoverClass: string
    onClick: () => void
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`group/action flex items-center gap-2 rounded-full py-1 pr-2 font-sans text-[1.3rem] font-light hover:cursor-pointer ${softTransition} ${focusRing} ${active ? activeClass : `text-mist-soft ${hoverClass}`}`}
        >
            <span
                className={`flex h-[34px] w-[34px] items-center justify-center rounded-full ${softTransition} group-hover/action:bg-mist-08`}
            >
                <FontAwesomeIcon icon={icon} />
            </span>
            <span className="sr-only">{label}</span>
            {count !== undefined && count > 0 && <span aria-hidden="true">{count.toLocaleString('pt-BR')}</span>}
        </button>
    )
}

export default function PostCard({
    post,
    userName,
    liked,
    reposted,
    saved,
    activeTag,
    onLike,
    onRepost,
    onSave,
    onReply,
    onTagClick,
}: PostCardProps) {
    const [showReplies, setShowReplies] = useState(false)
    const [draft, setDraft] = useState('')

    function handleReplySubmit(event: React.FormEvent) {
        event.preventDefault()
        const text = draft.trim()
        if (!text) return
        onReply(post.id, text)
        setDraft('')
    }

    return (
        <article className="border-b border-border py-7">
            <div className="flex gap-3">
                <Avatar initials={post.author.initials} className={post.author.avatarClass} />

                <div className="min-w-0 flex-1">
                    <header className="flex flex-wrap items-center gap-x-2 gap-y-0">
                        <h3 className="text-[1.7rem] font-medium text-mist">{post.author.name}</h3>
                        {post.author.verified && (
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                className="text-[1.3rem] text-aurora-soft"
                                title="Perfil verificado"
                            />
                        )}
                        <p className="font-sans text-[1.3rem] font-light text-mist-soft">
                            {post.author.handle} · {post.time}
                        </p>
                    </header>

                    <p className="whitespace-pre-line pt-[6px] font-sans text-[1.5rem] font-light leading-[1.65] text-mist">
                        {post.content}
                    </p>

                    {post.tags.length > 0 && (
                        <ul className="flex flex-wrap gap-2 pt-[10px]">
                            {post.tags.map((tag) => (
                                <li key={tag}>
                                    <button
                                        type="button"
                                        onClick={() => onTagClick(tag)}
                                        aria-pressed={activeTag === tag}
                                        className={`rounded-full border px-3 py-[3px] font-sans text-[1.2rem] font-light hover:cursor-pointer ${softTransition} ${focusRing} ${
                                            activeTag === tag
                                                ? 'border-aurora-42 text-aurora-soft'
                                                : 'border-border text-mist-dim hover:border-aurora-30 hover:text-aurora-soft'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {post.stat && (
                        <div className="mt-[14px] flex items-center gap-4 rounded-[12px] border border-border px-4 py-3">
                            <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-aurora-glow text-[1.4rem] text-aurora-soft">
                                <FontAwesomeIcon icon={statIcons[post.stat.icon]} />
                            </span>
                            <p className="font-sans text-[1.3rem] font-light text-mist-dim">
                                <span className="block text-[1.9rem] font-medium text-mist">{post.stat.value}</span>
                                {post.stat.label}
                            </p>
                        </div>
                    )}

                    <div className="mt-[10px] flex items-center justify-between">
                        <ActionButton
                            icon={faComment}
                            label={`Responder a ${post.author.name}`}
                            count={post.replies.length}
                            active={showReplies}
                            activeClass="text-aurora-soft"
                            hoverClass="hover:text-aurora-soft"
                            onClick={() => setShowReplies((previous) => !previous)}
                        />
                        <ActionButton
                            icon={faRetweet}
                            label="Repostar"
                            count={post.reposts}
                            active={reposted}
                            activeClass="text-sage"
                            hoverClass="hover:text-sage"
                            onClick={() => onRepost(post.id)}
                        />
                        <ActionButton
                            icon={faHeart}
                            label="Curtir"
                            count={post.likes}
                            active={liked}
                            activeClass="text-ember"
                            hoverClass="hover:text-ember"
                            onClick={() => onLike(post.id)}
                        />
                        <ActionButton
                            icon={faBookmark}
                            label="Salvar"
                            active={saved}
                            activeClass="text-gold"
                            hoverClass="hover:text-gold"
                            onClick={() => onSave(post.id)}
                        />
                    </div>

                    {showReplies && (
                        <div className="mt-[6px] border-t border-border pt-[16px]">
                            <ul className="flex flex-col gap-4">
                                {post.replies.map((reply) => (
                                    <li key={reply.id} className="flex gap-3">
                                        <Avatar initials={reply.author.initials} className={reply.author.avatarClass} size="sm" />
                                        <div className="min-w-0 flex-1">
                                            <p className="flex flex-wrap items-center gap-x-2 text-[1.5rem] font-normal text-mist">
                                                {reply.author.name}
                                                <span className="font-sans text-[1.2rem] font-light text-mist-soft">
                                                    {reply.author.handle} · {reply.time}
                                                </span>
                                            </p>
                                            <p className="font-sans text-[1.3rem] font-light text-mist-dim">{reply.content}</p>
                                        </div>
                                    </li>
                                ))}
                                {post.replies.length === 0 && (
                                    <li className="font-sans text-[1.3rem] font-light italic text-mist-soft">
                                        Nenhuma resposta ainda. A primeira já vale pontos.
                                    </li>
                                )}
                            </ul>

                            <form onSubmit={handleReplySubmit} className="mt-[16px] flex items-center gap-3">
                                <Avatar
                                    initials={userName ? userName.slice(0, 2) : 'MU'}
                                    className="bg-dusk-mid text-aurora-soft"
                                    size="sm"
                                />
                                <label className="flex-1">
                                    <span className="sr-only">Escreva uma resposta</span>
                                    <input
                                        value={draft}
                                        onChange={(event) => setDraft(event.target.value)}
                                        placeholder="Responda a esta publicação..."
                                        className={`w-full appearance-none border-0 border-b border-border-mid bg-transparent px-1 py-[9px] font-sans text-[1.3rem] font-light text-mist placeholder:text-mist-soft focus-visible:border-aurora focus-visible:outline-none ${focusRing}`}
                                    />
                                </label>
                                <button
                                    type="submit"
                                    disabled={draft.trim().length === 0}
                                    className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-aurora-30 text-aurora-soft hover:cursor-pointer hover:bg-violet-glow-08 disabled:cursor-not-allowed disabled:opacity-40 ${softTransition} ${focusRing}`}
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                    <span className="sr-only">Enviar resposta</span>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}
