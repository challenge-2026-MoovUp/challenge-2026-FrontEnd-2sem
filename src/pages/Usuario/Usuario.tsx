import { useState } from 'react'
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCoins, faEnvelope, faCalendar, faLeaf, faRoute, faTrain } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import Avatar from '../../components/feed/Avatar'
import PostCard from '../../components/feed/PostCard'
import { focusRing, ghostActionClass, labelClass, lineFieldClass, softTransition } from '../../components/common/uiStyles'
import { useCurtidas } from '../../hooks/useCurtidas'
import { useUsuario } from '../../hooks/useUsuario'
import type { UsuarioDTO } from '../../types/api'

interface UsuarioContext {
    onOpenModal: () => void
    userId: string | null
    userName: string | null
    atualizarSessao: (usuario: UsuarioDTO) => void
    sair: () => void
}

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

export default function Usuario() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { onOpenModal, userId, userName, atualizarSessao, sair } = useOutletContext<UsuarioContext>()
    const {
        perfil,
        impacto,
        historico,
        posts,
        loading,
        error,
        recarregar,
        editarConta,
        excluirConta,
        curtir,
        comentar,
        editarPostagem,
        excluirPostagem,
        excluirResposta,
    } = useUsuario(id)
    const { curtidas, marcarCurtida, desmarcarCurtida } = useCurtidas(userId)
    const [saved, setSaved] = useState<Set<string>>(new Set())
    const [erroAcao, setErroAcao] = useState<string | null>(null)
    const [editandoConta, setEditandoConta] = useState(false)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')

    const contaPropria = Boolean(userId) && userId === id

    function toggleSaved(idPostagem: string) {
        setSaved((anterior) => {
            const proximo = new Set(anterior)
            if (proximo.has(idPostagem)) proximo.delete(idPostagem)
            else proximo.add(idPostagem)
            return proximo
        })
    }

    async function handleLike(idPostagem: string) {
        if (!userId) {
            onOpenModal()
            return
        }
        if (curtidas.includes(idPostagem)) return

        setErroAcao(null)
        marcarCurtida(idPostagem)
        const resultado = await curtir(idPostagem, userId)

        if (!resultado.ok) {
            desmarcarCurtida(idPostagem)
            setErroAcao(resultado.reason ?? 'Falha ao curtir')
        }
    }

    async function executarAcao(acao: () => Promise<{ ok: boolean; reason?: string }>) {
        setErroAcao(null)
        const resultado = await acao()
        if (!resultado.ok) setErroAcao(resultado.reason ?? 'Falha na operação')
    }

    function handleReply(idPostagem: string, conteudo: string) {
        if (!userId) {
            onOpenModal()
            return
        }
        void executarAcao(() => comentar(idPostagem, userId, conteudo))
    }

    function abrirEdicaoConta() {
        setNome(perfil?.name ?? '')
        setEmail(perfil?.email ?? '')
        setEditandoConta(true)
    }

    async function handleEditarConta(event: React.FormEvent) {
        event.preventDefault()
        setErroAcao(null)
        const resultado = await editarConta({ nome, email })

        if (!resultado.usuario) {
            setErroAcao(resultado.reason ?? 'Falha ao editar a conta')
            return
        }

        atualizarSessao(resultado.usuario)
        setEditandoConta(false)
    }

    async function handleExcluirConta() {
        if (!window.confirm('Excluir sua conta?')) return

        setErroAcao(null)
        const resultado = await excluirConta()

        if (!resultado.ok) {
            setErroAcao(resultado.reason ?? 'Falha ao excluir a conta')
            return
        }

        sair()
        navigate('/')
    }

    function handleSair() {
        sair()
        navigate('/')
    }

    return (
        <section className="mx-auto w-full max-w-[760px] px-5 py-14 font-sans sm:px-8 md:px-10 md:py-20">
            <Link
                to="/feed"
                className={`inline-flex items-center gap-2 text-[1.3rem] font-light text-mist-soft hover:text-mist ${softTransition} ${focusRing}`}
            >
                <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
                Voltar ao feed
            </Link>

            {loading && !perfil && (
                <output className="block py-16 text-[1.4rem] font-light text-mist-soft">
                    Carregando perfil...
                </output>
            )}

            {error && !loading && (
                <div className="flex flex-wrap items-center gap-4 py-16">
                    <p className="text-[1.4rem] font-light text-ember">{error}</p>
                    <button type="button" onClick={() => void recarregar()} className={ghostActionClass}>
                        Tentar de novo
                    </button>
                </div>
            )}

            {perfil && !error && (
                <>
                    <header className="flex flex-col gap-7 border-b border-border pb-10 pt-10">
                        <div className="flex items-center gap-5">
                            <Avatar initials={perfil.initials} className={perfil.avatarClass} size="lg" />

                            <div className="min-w-0">
                                <h1 className="truncate text-[3rem] font-medium leading-[1.1] tracking-[-0.02em] text-mist md:text-[3.4rem]">
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

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <PerfilDado
                                icon={faCoins}
                                valor={`${perfil.saldoPontos.toLocaleString('pt-BR')} pts`}
                                label="Saldo de pontos"
                            />
                            <PerfilDado icon={faEnvelope} valor={perfil.email} label="E-mail" />
                            <PerfilDado icon={faCalendar} valor={perfil.membroDesde} label="Membro desde" />
                            {impacto && (
                                <>
                                    <PerfilDado icon={faTrain} valor={impacto.viagens} label="Viagens" />
                                    <PerfilDado icon={faRoute} valor={impacto.km} label="Percorridos" />
                                    <PerfilDado icon={faLeaf} valor={impacto.co2} label="CO₂ evitado" />
                                </>
                            )}
                        </div>

                        {contaPropria && (
                            <div className="flex flex-wrap gap-3">
                                <button type="button" onClick={abrirEdicaoConta} className={ghostActionClass}>
                                    Editar conta
                                </button>
                                <button type="button" onClick={handleSair} className={ghostActionClass}>
                                    Sair
                                </button>
                                <button type="button" onClick={() => void handleExcluirConta()} className={ghostActionClass}>
                                    Excluir conta
                                </button>
                            </div>
                        )}

                        {editandoConta && (
                            <form onSubmit={(event) => void handleEditarConta(event)} className="flex flex-col gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className={labelClass}>Nome</span>
                                    <input
                                        required
                                        maxLength={40}
                                        value={nome}
                                        onChange={(event) => setNome(event.target.value)}
                                        className={lineFieldClass}
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className={labelClass}>E-mail</span>
                                    <input
                                        required
                                        type="email"
                                        maxLength={60}
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className={lineFieldClass}
                                    />
                                </label>
                                <div className="flex gap-3">
                                    <button type="submit" className={ghostActionClass}>
                                        Salvar
                                    </button>
                                    <button type="button" onClick={() => setEditandoConta(false)} className={ghostActionClass}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        )}

                        {erroAcao && <p className="text-[1.4rem] font-light text-ember">{erroAcao}</p>}
                    </header>

                    <h2 className="border-b border-border py-5 text-[1.3rem] font-light text-mist-soft">
                        Histórico de impacto
                    </h2>

                    {historico.length === 0 && (
                        <p className="py-8 text-[1.4rem] font-light text-mist-soft">Nenhuma viagem registrada ainda.</p>
                    )}

                    <ul>
                        {historico.map((item) => (
                            <li key={item.id} className="border-b border-border py-4 last:border-0">
                                <p className="text-[1.5rem] font-light text-mist">{item.titulo}</p>
                                <p className="text-[1.2rem] font-light text-mist-soft">{item.detalhe}</p>
                            </li>
                        ))}
                    </ul>

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
                            liked={curtidas.includes(post.id)}
                            saved={saved.has(post.id)}
                            activeTag={null}
                            onLike={(idPostagem) => void handleLike(idPostagem)}
                            onSave={toggleSaved}
                            onReply={handleReply}
                            onTagClick={() => undefined}
                            onEdit={(idPostagem, conteudo) => void executarAcao(() => editarPostagem(idPostagem, conteudo))}
                            onDelete={(idPostagem) => void executarAcao(() => excluirPostagem(idPostagem))}
                            onDeleteReply={(idComentario) => void executarAcao(() => excluirResposta(idComentario))}
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
