import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
    faComment,
    faHeart,
    faBookmark,
    faPaperPlane,
    faPen,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import type { FeedPost } from '../../types/feed'
import Avatar from './Avatar'
import { focusRing, ghostActionClass, softTransition } from '../common/uiStyles'
import { rotaPerfil } from '../../routes/rotaPerfil'

interface PostCardProps {
    post: FeedPost
    userId: string | null
    userName: string | null
    liked: boolean
    saved: boolean
    onLike: (id: string) => void
    onSave: (id: string) => void
    onReply: (id: string, content: string) => void
    onEdit?: (id: string, content: string) => void
    onDelete?: (id: string) => void
    onDeleteReply?: (id: string) => void
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
    userId,
    userName,
    liked,
    saved,
    onLike,
    onSave,
    onReply,
    onEdit,
    onDelete,
    onDeleteReply,
}: PostCardProps) {
    const [showReplies, setShowReplies] = useState(false)
    const [draft, setDraft] = useState('')
    const [editing, setEditing] = useState(false)
    const [editDraft, setEditDraft] = useState('')

    const isAuthor = userId === post.author.id

    function startEditing() {
        setEditDraft(post.content)
        setEditing(true)
    }

    function handleEditSubmit(event: React.FormEvent) {
        event.preventDefault()
        const text = editDraft.trim()
        if (!text) return
        onEdit?.(post.id, text)
        setEditing(false)
    }

    function handleDelete() {
        if (window.confirm('Excluir esta publicação?')) onDelete?.(post.id)
    }

    function handleDeleteReply(id: string) {
        if (window.confirm('Excluir esta resposta?')) onDeleteReply?.(id)
    }

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
                <Link to={rotaPerfil(post.author.handle)} aria-hidden="true" tabIndex={-1} className="shrink-0">
                    <Avatar initials={post.author.initials} className={post.author.avatarClass} />
                </Link>

                <div className="min-w-0 flex-1">
                    <header className="flex flex-wrap items-center gap-x-2 gap-y-0">
                        <h3 className="text-[1.7rem] font-medium text-mist">
                            <Link
                                to={rotaPerfil(post.author.handle)}
                                className={`hover:underline ${softTransition} ${focusRing}`}
                            >
                                {post.author.name}
                            </Link>
                        </h3>
                        <p className="font-sans text-[1.3rem] font-light text-mist-soft">
                            {post.author.handle} ·{' '}
                            <Link to={`/feed/${post.id}`} className={`hover:underline ${softTransition} ${focusRing}`}>
                                {post.time}
                            </Link>
                        </p>
                    </header>

                    {editing ? (
                        <form onSubmit={handleEditSubmit} className="pt-[6px]">
                            <label>
                                <span className="sr-only">Editar publicação</span>
                                <textarea
                                    value={editDraft}
                                    onChange={(event) => setEditDraft(event.target.value)}
                                    rows={3}
                                    maxLength={200}
                                    className={`w-full resize-none appearance-none border-0 border-b border-border-mid bg-transparent px-1 py-[9px] font-sans text-[1.5rem] font-light text-mist focus-visible:border-aurora focus-visible:outline-none ${focusRing}`}
                                />
                            </label>
                            <div className="mt-3 flex gap-3">
                                <button type="submit" disabled={editDraft.trim().length === 0} className={ghostActionClass}>
                                    Salvar
                                </button>
                                <button type="button" onClick={() => setEditing(false)} className={ghostActionClass}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="whitespace-pre-line pt-[6px] font-sans text-[1.5rem] font-light leading-[1.65] text-mist">
                            {post.content}
                        </p>
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
                        {isAuthor && onEdit && (
                            <ActionButton
                                icon={faPen}
                                label="Editar"
                                active={editing}
                                activeClass="text-aurora-soft"
                                hoverClass="hover:text-aurora-soft"
                                onClick={startEditing}
                            />
                        )}
                        {isAuthor && onDelete && (
                            <ActionButton
                                icon={faTrash}
                                label="Excluir"
                                activeClass="text-ember"
                                hoverClass="hover:text-ember"
                                onClick={handleDelete}
                            />
                        )}
                    </div>

                    {showReplies && (
                        <div className="mt-[6px] border-t border-border pt-[16px]">
                            <ul className="flex flex-col gap-4">
                                {post.replies.map((reply) => (
                                    <li key={reply.id} className="flex gap-3">
                                        <Avatar initials={reply.author.initials} className={reply.author.avatarClass} size="sm" />
                                        <div className="min-w-0 flex-1">
                                            <p className="flex flex-wrap items-center gap-x-2 text-[1.5rem] font-normal text-mist">
                                                <Link
                                                    to={rotaPerfil(reply.author.handle)}
                                                    className={`hover:underline ${softTransition} ${focusRing}`}
                                                >
                                                    {reply.author.name}
                                                </Link>
                                                <span className="font-sans text-[1.2rem] font-light text-mist-soft">
                                                    {reply.author.handle} · {reply.time}
                                                </span>
                                            </p>
                                            <p className="font-sans text-[1.3rem] font-light text-mist-dim">{reply.content}</p>
                                        </div>
                                        {userId === reply.author.id && onDeleteReply && (
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteReply(reply.id)}
                                                className={`shrink-0 self-start text-[1.2rem] text-mist-soft hover:cursor-pointer hover:text-ember ${softTransition} ${focusRing}`}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                                <span className="sr-only">Excluir resposta</span>
                                            </button>
                                        )}
                                    </li>
                                ))}
                                {post.replies.length === 0 && (
                                    <li className="font-sans text-[1.3rem] font-light italic text-mist-soft">
                                        Nenhuma resposta ainda.
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
                                        maxLength={200}
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
