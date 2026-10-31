import { useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Composer from '../../components/feed/Composer'
import FeedSidebar from '../../components/feed/FeedSidebar'
import PostCard from '../../components/feed/PostCard'
import WalletRail from '../../components/feed/WalletRail'
import { focusRing, ghostActionClass, softTransition } from '../../components/common/uiStyles'
import type { FeedPost } from '../../types/feed'
import { actionLabels, pointsPerAction } from '../../data/points'
import type { PointsAction } from '../../data/points'
import { useFeed } from '../../hooks/useFeed'
import { useWallet } from '../../hooks/useWallet'

interface FeedContext {
    onOpenModal: () => void
    userEmail: string | null
    userId: string | null
}

const tabs = [
    { id: 'para-voce', label: 'Para você' },
    { id: 'seguindo', label: 'Seguindo' },
    { id: 'salvos', label: 'Salvos' },
] as const

type TabId = (typeof tabs)[number]['id']

export default function Feed() {
    const { onOpenModal, userId } = useOutletContext<FeedContext>()
    const { earn } = useWallet()
    const { posts: postsDaApi, loading, error, recarregar, publicar } = useFeed()

    /* O feed vem da API, mas curtida, repost e resposta são otimistas: a cópia
       local absorve a interação na hora e é substituída no próximo recarregar. */
    const [posts, setPosts] = useState<FeedPost[]>([])

    useEffect(() => {
        setPosts(postsDaApi)
    }, [postsDaApi])

    const [liked, setLiked] = useState<Record<string, boolean>>({})
    const [reposted, setReposted] = useState<Record<string, boolean>>({})
    const [saved, setSaved] = useState<Record<string, boolean>>({})
    const [following, setFollowing] = useState<string[]>(['moovup'])
    const [tab, setTab] = useState<TabId>('para-voce')
    const [query, setQuery] = useState('')
    const [activeTag, setActiveTag] = useState<string | null>(null)
    const [toast, setToast] = useState<{ id: number; text: string } | null>(null)

    useEffect(() => {
        if (!toast) return
        const timer = window.setTimeout(() => setToast(null), 2200)
        return () => window.clearTimeout(timer)
    }, [toast])

    const visiblePosts = useMemo(() => {
        const search = query.trim().toLowerCase()

        return posts.filter((post) => {
            if (tab === 'seguindo' && !following.includes(post.author.id) && post.author.id !== 'eu') return false
            if (tab === 'salvos' && !saved[post.id]) return false
            if (activeTag && !post.tags.includes(activeTag)) return false
            if (!search) return true

            return (
                post.content.toLowerCase().includes(search) ||
                post.author.name.toLowerCase().includes(search) ||
                post.author.handle.toLowerCase().includes(search) ||
                post.tags.some((tag) => tag.toLowerCase().includes(search))
            )
        })
    }, [posts, tab, following, saved, activeTag, query])

    /** Credita (ou estorna) os pontos da ação na carteira e mostra o aviso flutuante. */
    function reward(action: PointsAction, undo = false) {
        const amount = pointsPerAction[action]
        earn(action, undo)
        setToast({
            id: Date.now(),
            text: undo ? `-${amount} pontos · ${actionLabels[action]} desfeita` : `+${amount} pontos · ${actionLabels[action]}`,
        })
    }

    function requireLogin() {
        if (userId) return false
        onOpenModal()
        return true
    }

    function handleLike(id: string) {
        if (requireLogin()) return
        const isLiked = Boolean(liked[id])
        setLiked((previous) => ({ ...previous, [id]: !isLiked }))
        setPosts((previous) =>
            previous.map((post) => (post.id === id ? { ...post, likes: post.likes + (isLiked ? -1 : 1) } : post)),
        )
        reward('curtida', isLiked)
    }

    function handleRepost(id: string) {
        if (requireLogin()) return
        const isReposted = Boolean(reposted[id])
        setReposted((previous) => ({ ...previous, [id]: !isReposted }))
        setPosts((previous) =>
            previous.map((post) => (post.id === id ? { ...post, reposts: post.reposts + (isReposted ? -1 : 1) } : post)),
        )
        reward('repost', isReposted)
    }

    function handleSave(id: string) {
        if (requireLogin()) return
        const isSaved = Boolean(saved[id])
        setSaved((previous) => ({ ...previous, [id]: !isSaved }))
        setToast({ id: Date.now(), text: isSaved ? 'Removido dos salvos' : 'Salvo para depois' })
    }

    function handleReply(id: string, content: string) {
        if (requireLogin()) return
        const author = {
            id: 'eu',
            name: userId as string,
            handle: `@${(userId as string).toLowerCase().replace(/\s+/g, '')}`,
            initials: (userId as string).slice(0, 2),
            avatarClass: 'bg-dusk-mid text-aurora-soft',
        }
        setPosts((previous) =>
            previous.map((post) =>
                post.id === id
                    ? { ...post, replies: [...post.replies, { id: `${id}-r-${Date.now()}`, author, time: 'agora', content }] }
                    : post,
            ),
        )
        reward('resposta')
    }

    async function handlePublish(content: string) {
        if (requireLogin()) return

        /* O contrato pede título separado do corpo; a UI tem um campo só, então
           a primeira linha vira título. */
        const titulo = content.split('\n')[0].slice(0, 80)

        const resultado = await publicar({
            idUsuario: userId as string,
            titulo,
            conteudo: content,
            tipoPostagem: 'TEXTO',
        })

        if (!resultado.ok) {
            setToast({ id: Date.now(), text: resultado.reason ?? 'Falha ao publicar' })
            return
        }

        setTab('para-voce')
        setActiveTag(null)
        setQuery('')
        reward('publicacao')
    }

    function handleTagClick(tag: string) {
        setActiveTag((previous) => (previous === tag ? null : tag))
    }

    function handleToggleFollow(id: string) {
        if (requireLogin()) return
        setFollowing((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]))
    }

    function clearFilters() {
        setActiveTag(null)
        setQuery('')
        setTab('para-voce')
    }

    return (
        <>
            <section className="mx-auto w-full max-w-[1400px] px-5 py-14 font-sans tablet:px-10 tablet:py-20">
                <div className="grid grid-cols-1 items-start gap-14 desktop:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,280px)] desktop:gap-16">
                    <aside className="desktop:sticky desktop:top-[100px]">
                        <WalletRail userId={userId} />
                    </aside>

                    <div>
                        <header>
                            <h1 className="pt-3 text-[3rem] font-medium leading-[1.05] tracking-[-0.02em] text-mist tablet:text-[3.8rem]">
                                O que está movendo São Paulo
                            </h1>
                        </header>

                        <nav
                            className="mt-8 flex gap-8 border-b border-border"
                            aria-label="Filtros do feed"
                        >
                            {tabs.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setTab(item.id)}
                                    aria-current={tab === item.id}
                                    className={`-mb-[1px] border-b-2 pb-3 text-[1.35rem] font-light hover:cursor-pointer ${softTransition} ${focusRing} ${
                                        tab === item.id
                                            ? 'border-aurora text-mist'
                                            : 'border-transparent text-mist-soft hover:text-mist'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <Composer
                            userId={userId}
                            pointsPerPost={pointsPerAction.publicacao}
                            onPublish={handlePublish}
                            onOpenModal={onOpenModal}
                        />

                        {(activeTag || query) && (
                            <p className="flex flex-wrap items-center gap-4 border-b border-border py-5 text-[1.3rem] font-light text-mist-soft">
                                {visiblePosts.length} resultado{visiblePosts.length === 1 ? '' : 's'}
                                {activeTag && <span className="text-aurora-soft">{activeTag}</span>}
                                {query && <span className="text-aurora-soft">“{query}”</span>}
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className={ghostActionClass}
                                >
                                    Limpar filtros
                                </button>
                            </p>
                        )}

                        {loading && (
                            <p className="py-12 text-[1.4rem] font-light text-mist-soft" role="status">
                                Carregando publicações…
                            </p>
                        )}

                        {error && !loading && (
                            <div className="flex flex-wrap items-center gap-4 py-12">
                                <p className="text-[1.4rem] font-light text-ember">{error}</p>
                                <button type="button" onClick={() => void recarregar()} className={ghostActionClass}>
                                    Tentar de novo
                                </button>
                            </div>
                        )}

                        {visiblePosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                userId={userId}
                                liked={Boolean(liked[post.id])}
                                reposted={Boolean(reposted[post.id])}
                                saved={Boolean(saved[post.id])}
                                activeTag={activeTag}
                                onLike={handleLike}
                                onRepost={handleRepost}
                                onSave={handleSave}
                                onReply={handleReply}
                                onTagClick={handleTagClick}
                            />
                        ))}

                        {visiblePosts.length === 0 && !loading && !error && (
                            <p className="py-12 text-[1.4rem] font-light text-mist-soft">
                                {tab === 'salvos'
                                    ? 'Você ainda não salvou nenhuma publicação.'
                                    : 'Nada por aqui com esses filtros.'}
                            </p>
                        )}
                    </div>

                    <aside className="desktop:sticky desktop:top-[100px]">
                        <FeedSidebar
                            query={query}
                            onQueryChange={setQuery}
                            activeTag={activeTag}
                            onTagClick={handleTagClick}
                            following={following}
                            onToggleFollow={handleToggleFollow}
                        />
                    </aside>
                </div>
            </section>

            <div
                className="pointer-events-none fixed inset-x-0 bottom-8 z-[1100] flex justify-center px-4"
                role="status"
                aria-live="polite"
            >
                {toast && (
                    <p
                        key={toast.id}
                        className="rounded-full bg-mist px-5 py-[10px] font-sans text-[1.3rem] font-medium text-void shadow-[0_12px_32px_var(--color-black-42)]"
                    >
                        {toast.text}
                    </p>
                )}
            </div>
        </>
    )
}
