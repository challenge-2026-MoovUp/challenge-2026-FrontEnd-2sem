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
            const [postagens, usuarios] = await Promise.all([listarPostagens(), listarUsuarios()])
            const autores = mapaDeAutores(usuarios)

            // Comentários são um endpoint por postagem: N+1 chamadas no feed.
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

    const curtir = useCallback(async (idPostagem: string, idUsuario: string) => {
        try {
            const { curtidas } = await curtirPostagem(idPostagem, { idUsuario })
            setPosts((anteriores) =>
                anteriores.map((post) => (post.id === idPostagem ? { ...post, likes: curtidas } : post)),
            )
            return { ok: true }
        } catch (erro) {
            // 422 = já curtiu. O servidor está certo, a UI só acompanha.
            if (erro instanceof ApiError && erro.status === 422) return { ok: true, jaCurtiu: true }
            const reason = erro instanceof ApiError ? erro.mensagem : 'Falha ao curtir'
            return { ok: false, reason }
        }
    }, [])

    return { posts, loading, error, recarregar: carregar, publicar, comentar, curtir }
}
