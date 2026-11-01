/* Tela de perfil: cabeçalho do usuário + todas as postagens dele.

   Componente de apresentação: não chama API. Quem monta a rota passa
   perfil/posts/loading/error — ver o hook useUsuario. Mesma linguagem visual
   do Feed: sem caixas, hierarquia por tipografia e fios como separador. */

import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCoins, faEnvelope, faCalendar } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import Avatar from '../../components/feed/Avatar'
import PostCard from '../../components/feed/PostCard'
import { focusRing, ghostActionClass, softTransition } from '../../components/common/uiStyles'
import type { FeedPost } from '../../types/feed'
import type { PerfilUsuario } from '../../types/perfil'

interface UsuarioContext {
    userId: string | null
    userName: string | null
}

interface UsuarioProps {
    perfil: PerfilUsuario | null
    posts: FeedPost[]
    loading: boolean
    error: string | null
    onRecarregar: () => void
}

/** Dado do perfil em uma linha: ícone discreto, valor em destaque, rótulo abaixo. */
function PerfilDado({ icon, valor, label }: { icon: IconDefinition; valor: string; label: string }) {
    return (
        <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={icon} className="mt-[6px] text-[1.3rem] text-aurora-soft" aria-hidden="true" />
            <div className="min-w-0">
                <p className="truncate text-[1.5rem] font-medium text-mist">{valor}</p>
                <p className="font-sans text-[1.15rem] font-light uppercase tracking-[0.1em] text-mist-soft">{label}</p>
            </div>
        </div>
    )
}

export default function Usuario({ perfil, posts, loading, error, onRecarregar }: UsuarioProps) {
    const { userId, userName } = useOutletContext<UsuarioContext>()

    /* Interações só de tela, como no Feed: a API não tem curtida por usuário. */
    const [liked, setLiked] = useState<Set<string>>(new Set())
    const [reposted, setReposted] = useState<Set<string>>(new Set())
    const [saved, setSaved] = useState<Set<string>>(new Set())

    function toggle(setter: React.Dispatch<React.SetStateAction<Set<string>>>, id: string) {
        setter((anterior) => {
            const proximo = new Set(anterior)
            if (proximo.has(id)) proximo.delete(id)
            else proximo.add(id)
            return proximo
        })
    }

    return (
        <section className="mx-auto w-full max-w-[760px] px-5 py-14 font-sans tablet:px-10 tablet:py-20">
            <Link
                to="/feed"
                className={`inline-flex items-center gap-2 text-[1.3rem] font-light text-mist-soft hover:text-mist ${softTransition} ${focusRing}`}
            >
                <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
                Voltar ao feed
            </Link>

            {loading && (
                <output className="block py-16 text-[1.4rem] font-light text-mist-soft">
                    Carregando perfil...
                </output>
            )}

            {error && !loading && (
                <div className="flex flex-wrap items-center gap-4 py-16">
                    <p className="text-[1.4rem] font-light text-ember">{error}</p>
                    <button type="button" onClick={onRecarregar} className={ghostActionClass}>
                        Tentar de novo
                    </button>
                </div>
            )}

            {perfil && !loading && !error && (
                <>
                    <header className="flex flex-col gap-7 border-b border-border pb-10 pt-10">
                        <div className="flex items-center gap-5">
                            <Avatar initials={perfil.initials} className={perfil.avatarClass} size="lg" />

                            <div className="min-w-0">
                                <h1 className="truncate text-[3rem] font-medium leading-[1.1] tracking-[-0.02em] text-mist tablet:text-[3.4rem]">
                                    {perfil.name}
                                </h1>
                                <p className="pt-1 text-[1.4rem] font-light text-mist-soft">
                                    {perfil.handle}
                                    {!perfil.ativo && (
                                        <span className="ml-3 rounded-full border border-border-mid px-3 py-[2px] text-[1.15rem] uppercase tracking-[0.08em] text-mist-dim">
                                            Conta inativa
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3">
                            <PerfilDado
                                icon={faCoins}
                                valor={`${perfil.saldoPontos.toLocaleString('pt-BR')} pts`}
                                label="Saldo de pontos"
                            />
                            <PerfilDado icon={faEnvelope} valor={perfil.email} label="E-mail" />
                            <PerfilDado icon={faCalendar} valor={perfil.membroDesde} label="Membro desde" />
                        </div>
                    </header>

                    <h2 className="flex flex-wrap items-center gap-4 border-b border-border py-5 text-[1.3rem] font-light text-mist-soft">
                        Postagens
                        <span className="text-aurora-soft">{posts.length}</span>
                    </h2>

                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            userId={userId}
                            userName={userName}
                            liked={liked.has(post.id)}
                            reposted={reposted.has(post.id)}
                            saved={saved.has(post.id)}
                            activeTag={null}
                            onLike={(id) => toggle(setLiked, id)}
                            onRepost={(id) => toggle(setReposted, id)}
                            onSave={(id) => toggle(setSaved, id)}
                            onReply={() => undefined}
                            onTagClick={() => undefined}
                        />
                    ))}

                    {posts.length === 0 && (
                        <p className="py-16 text-[1.4rem] font-light text-mist-soft">
                            {perfil.name} ainda não publicou nada.
                        </p>
                    )}
                </>
            )}
        </section>
    )
}
