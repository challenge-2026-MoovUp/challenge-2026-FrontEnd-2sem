import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../components/feed/Avatar'
import { focusRing, ghostActionClass, softTransition } from '../../components/common/uiStyles'
import { usePostagem } from '../../hooks/usePostagem'
import { rotaPerfil } from '../../routes/rotaPerfil'

export default function PostagemDetalhe() {
    const { id } = useParams()
    const { post, loading, error, recarregar } = usePostagem(id)

    return (
        <section className="mx-auto w-full max-w-[760px] px-5 py-14 font-sans sm:px-8 md:px-10 md:py-20">
            <Link
                to="/feed"
                className={`inline-flex items-center gap-2 text-[1.3rem] font-light text-mist-soft hover:text-mist ${softTransition} ${focusRing}`}
            >
                <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
                Voltar ao feed
            </Link>

            {loading && (
                <output className="block py-16 text-[1.4rem] font-light text-mist-soft">Carregando publicação...</output>
            )}

            {error && !loading && (
                <div className="flex flex-wrap items-center gap-4 py-16">
                    <p className="text-[1.4rem] font-light text-ember">{error}</p>
                    <button type="button" onClick={() => void recarregar()} className={ghostActionClass}>
                        Tentar de novo
                    </button>
                </div>
            )}

            {post && !loading && !error && (
                <article className="pt-10">
                    <header className="flex items-center gap-4">
                        <Avatar initials={post.author.initials} className={post.author.avatarClass} />
                        <div className="min-w-0">
                            <Link
                                to={rotaPerfil(post.author.handle)}
                                className={`block truncate text-[1.7rem] font-medium text-mist hover:underline ${softTransition} ${focusRing}`}
                            >
                                {post.author.name}
                            </Link>
                            <p className="text-[1.3rem] font-light text-mist-soft">
                                {post.author.handle} · {post.time}
                            </p>
                        </div>
                    </header>

                    <p className="whitespace-pre-line pt-6 text-[1.8rem] font-light leading-[1.6] text-mist">
                        {post.content}
                    </p>
                    <p className="pt-4 text-[1.3rem] font-light text-mist-soft">{post.likes} curtidas</p>

                    <h2 className="mt-8 flex items-center gap-4 border-y border-border py-5 text-[1.3rem] font-light text-mist-soft">
                        Respostas
                        <span className="text-aurora-soft">{post.replies.length}</span>
                    </h2>

                    {post.replies.length === 0 && (
                        <p className="py-10 text-[1.4rem] font-light text-mist-soft">Nenhuma resposta ainda.</p>
                    )}

                    <ul>
                        {post.replies.map((reply) => (
                            <li key={reply.id} className="flex gap-3 border-b border-border py-5 last:border-0">
                                <Avatar initials={reply.author.initials} className={reply.author.avatarClass} size="sm" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-[1.2rem] font-light text-mist-soft">
                                        <Link
                                            to={rotaPerfil(reply.author.handle)}
                                            className={`text-[1.5rem] font-normal text-mist hover:underline ${softTransition} ${focusRing}`}
                                        >
                                            {reply.author.name}
                                        </Link>{' '}
                                        {reply.author.handle} · {reply.time}
                                    </p>
                                    <p className="text-[1.3rem] font-light text-mist-dim">{reply.content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </article>
            )}
        </section>
    )
}
