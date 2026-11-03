import { useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Composer from '../../components/feed/Composer'
import FeedSidebar from '../../components/feed/FeedSidebar'
import PostCard from '../../components/feed/PostCard'
import WalletRail from '../../components/feed/WalletRail'
import { focusRing, ghostActionClass, softTransition } from '../../components/common/uiStyles'
import { pointsPerAction } from '../../data/points'
import { useCurtidas } from '../../hooks/useCurtidas'
import { useFeed } from '../../hooks/useFeed'
import { useSeguindo } from '../../hooks/useSeguindo'
import { tituloDe } from '../../mappers/feedMapper'
import { useWallet } from '../../hooks/useWallet'

interface FeedContext {
    onOpenModal: () => void
    userEmail: string | null
    userName: string | null
    userId: string | null
}

const tabs = [
    { id: 'para-voce', label: 'Para você' },
    { id: 'seguindo', label: 'Seguindo' },
    { id: 'salvos', label: 'Salvos' },
] as const

type TabId = (typeof tabs)[number]['id']

export default function Feed() {
    const { onOpenModal, userId, userName } = useOutletContext<FeedContext>()
    const { recarregar: recarregarCarteira } = useWallet()
    const { posts, loading, error, recarregar, publicar, comentar, curtir, editar, excluir, excluirResposta } = useFeed()

    const { curtidas, marcarCurtida, desmarcarCurtida } = useCurtidas(userId)
    const [saved, setSaved] = useState<Record<string, boolean>>({})
    const { seguindo, alternarSeguir } = useSeguindo(userId)
    const [tab, setTab] = useState<TabId>('para-voce')
    const [query, setQuery] = useState('')
    const [toast, setToast] = useState<{ id: number; text: string } | null>(null)

    useEffect(() => {
        if (!toast) return
        const timer = window.setTimeout(() => setToast(null), 2200)
        return () => window.clearTimeout(timer)
    }, [toast])

    const visiblePosts = useMemo(() => {
        const search = query.trim().toLowerCase()

        return posts.filter((post) => {
            if (tab === 'seguindo' && !seguindo.includes(post.author.id)) return false
            if (tab === 'salvos' && !saved[post.id]) return false
            if (!search) return true

            return (
                post.content.toLowerCase().includes(search) ||
                post.author.name.toLowerCase().includes(search) ||
                post.author.handle.toLowerCase().includes(search)
            )
        })
    }, [posts, tab, seguindo, saved, query])

    function requireLogin() {
        if (userId) return false
        onOpenModal()
        return true
    }

    async function handleLike(id: string) {
        if (requireLogin()) return
        if (curtidas.includes(id)) return

        marcarCurtida(id)
        const resultado = await curtir(id, userId as string)

        if (!resultado.ok) {
            desmarcarCurtida(id)
            setToast({ id: Date.now(), text: resultado.reason ?? 'Falha ao curtir' })
        }
    }

    function handleSave(id: string) {
        if (requireLogin()) return
        const isSaved = Boolean(saved[id])
        setSaved((previous) => ({ ...previous, [id]: !isSaved }))
        setToast({ id: Date.now(), text: isSaved ? 'Removido dos salvos' : 'Salvo para depois' })
    }

    async function handleReply(id: string, content: string) {
        if (requireLogin()) return

        const resultado = await comentar(id, { idUsuario: userId as string, conteudo: content })

        if (!resultado.ok) {
            setToast({ id: Date.now(), text: resultado.reason ?? 'Falha ao comentar' })
        }
    }

    async function handlePublish(content: string) {
        if (requireLogin()) return

        const resultado = await publicar({
            idUsuario: userId as string,
            titulo: tituloDe(content),
            conteudo: content,
            tipoPostagem: 'TEXTO',
        })

        if (!resultado.ok) {
            setToast({ id: Date.now(), text: resultado.reason ?? 'Falha ao publicar' })
            return
        }

        setTab('para-voce')
        setQuery('')
        void recarregarCarteira()
        setToast({ id: Date.now(), text: `+${pointsPerAction.publicacao} pontos · publicação` })
    }

    async function handleEdit(id: string, content: string) {
        const resultado = await editar(id, { titulo: tituloDe(content), conteudo: content })

        if (!resultado.ok) {
            setToast({ id: Date.now(), text: resultado.reason ?? 'Falha ao editar' })
        }
    }

    async function handleDelete(id: string) {
        const resultado = await excluir(id)

        if (!resultado.ok) {
            setToast({ id: Date.now(), text: resultado.reason ?? 'Falha ao excluir' })
        }
    }

    async function handleDeleteReply(id: string) {
        const resultado = await excluirResposta(id)

        if (!resultado.ok) {
            setToast({ id: Date.now(), text: resultado.reason ?? 'Falha ao excluir a resposta' })
        }
    }

    async function handleToggleFollow(id: string) {
        if (requireLogin()) return

        const resultado = await alternarSeguir(userId as string, id)

        if (!resultado.ok) {
            setToast({ id: Date.now(), text: resultado.reason ?? 'Falha ao atualizar quem você segue' })
        }
    }

    function clearFilters() {
        setQuery('')
        setTab('para-voce')
    }

    return (
        <>
            <section className="mx-auto w-full max-w-[1400px] px-5 py-14 font-sans sm:px-8 md:px-10 md:py-20">
                <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,280px)] lg:gap-16 xl:gap-20">
                    <aside className="lg:sticky lg:top-[100px]">
                        <WalletRail userName={userName} onOpenModal={onOpenModal} />
                    </aside>

                    <div>
                        <header>
                            <h1 className="pt-3 text-[3rem] font-medium leading-[1.05] tracking-[-0.02em] text-mist md:text-[3.8rem]">
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
                            userName={userName}
                            pointsPerPost={pointsPerAction.publicacao}
                            onPublish={handlePublish}
                            onOpenModal={onOpenModal}
                        />

                        {query && (
                            <p className="flex flex-wrap items-center gap-4 border-b border-border py-5 text-[1.3rem] font-light text-mist-soft">
                                {visiblePosts.length} resultado{visiblePosts.length === 1 ? '' : 's'}
                                <span className="text-aurora-soft">“{query}”</span>
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
                            <output className="block py-12 text-[1.4rem] font-light text-mist-soft">
                                Carregando publicações…
                            </output>
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
                                userName={userName}
                                liked={curtidas.includes(post.id)}
                                saved={Boolean(saved[post.id])}
                                onLike={(id) => void handleLike(id)}
                                onSave={handleSave}
                                onReply={handleReply}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onDeleteReply={handleDeleteReply}
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

                    <aside className="lg:sticky lg:top-[100px]">
                        <FeedSidebar
                            query={query}
                            onQueryChange={setQuery}
                            following={seguindo}
                            onToggleFollow={(id) => void handleToggleFollow(id)}
                        />
                    </aside>
                </div>
            </section>

            <output
                className="pointer-events-none fixed inset-x-0 bottom-8 z-[1100] flex justify-center px-4"
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
            </output>
        </>
    )
}
