/* Estado do feed vindo da API: carrega postagens + autores e devolve FeedPost[].
   Ligado em Feed.tsx, que trata loading/error e mantém uma cópia local dos
   posts para as interações otimistas. */

import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '../api/http'
import { criarPostagem, curtirPostagem, listarPostagens } from '../api/postagensApi'
import { criarComentario, listarComentarios } from '../api/comentariosApi'
import { listarUsuarios } from '../api/usuariosApi'
import { mapaDeAutores, toFeedPost } from '../mappers/feedMapper'
import type { NovaPostagem, NovoComentario } from '../types/api'
import type { FeedPost } from '../types/feed'

export function useFeed() {
    const [posts, setPosts] = useState<FeedPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const carregar = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            /* Duas chamadas em paralelo: as postagens e os usuários, que são
               necessários para resolver o autor (ver feedMapper). */
            const [postagens, usuarios] = await Promise.all([listarPostagens(), listarUsuarios()])
            const autores = mapaDeAutores(usuarios)

            /* Comentários são um endpoint por postagem. Em um feed grande isso
               vira N+1 chamadas — se pesar, carregue os comentários só ao abrir
               o post, ou peça ao back para embutir na resposta. */
            const comentarios = await Promise.all(
                postagens.map((postagem) => listarComentarios(postagem.id)),
            )

            setPosts(postagens.map((postagem, i) => toFeedPost(postagem, autores, comentarios[i])))
        } catch (erro) {
            setError(erro instanceof ApiError ? erro.mensagem : 'Falha ao carregar o feed')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void carregar()
    }, [carregar])

    /** Publica e recarrega o feed. O saldo de pontos muda no servidor. */
    const publicar = useCallback(
        async (body: NovaPostagem) => {
            try {
                await criarPostagem(body)
                await carregar()
                return { ok: true }
            } catch (erro) {
                const reason = erro instanceof ApiError ? erro.mensagem : 'Falha ao publicar'
                return { ok: false, reason }
            }
        },
        [carregar],
    )

    /** Comenta e recarrega o feed. O comentario passa a existir no servidor;
        os pontos da resposta seguem locais (o contrato nao tem regra). */
    const comentar = useCallback(
        async (idPostagem: string, body: NovoComentario) => {
            try {
                await criarComentario(idPostagem, body)
                await carregar()
                return { ok: true }
            } catch (erro) {
                const reason = erro instanceof ApiError ? erro.mensagem : 'Falha ao comentar'
                return { ok: false, reason }
            }
        },
        [carregar],
    )

    /** Curte no servidor e aplica o total que ele devolve. Sem recarregar o
        feed: a resposta já traz o novo valor de curtidas. O 422 de "já curtiu"
        não é erro de verdade — o estado do servidor é o que a UI quer. */
    const curtir = useCallback(async (idPostagem: string, idUsuario: string) => {
        try {
            const { curtidas } = await curtirPostagem(idPostagem, { idUsuario })
            setPosts((anteriores) =>
                anteriores.map((post) => (post.id === idPostagem ? { ...post, likes: curtidas } : post)),
            )
            return { ok: true }
        } catch (erro) {
            if (erro instanceof ApiError && erro.status === 422) return { ok: true, jaCurtiu: true }
            const reason = erro instanceof ApiError ? erro.mensagem : 'Falha ao curtir'
            return { ok: false, reason }
        }
    }, [])

    return { posts, loading, error, recarregar: carregar, publicar, comentar, curtir }
}
