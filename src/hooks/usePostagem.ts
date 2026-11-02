import { useCallback, useEffect, useState } from 'react'
import { mensagemDe } from '../api/http'
import { listarComentarios } from '../api/comentariosApi'
import { buscarPostagem } from '../api/postagensApi'
import { toFeedPost } from '../mappers/feedMapper'
import type { FeedPost } from '../types/feed'

export function usePostagem(id: string | undefined) {
    const [post, setPost] = useState<FeedPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const carregar = useCallback(async () => {
        if (!id) return

        setLoading(true)
        setError(null)

        try {
            const [postagem, comentarios] = await Promise.all([buscarPostagem(id), listarComentarios(id)])
            setPost(toFeedPost(postagem, comentarios))
        } catch (erro) {
            setPost(null)
            setError(mensagemDe(erro, 'Falha ao carregar a publicação'))
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        void carregar()
    }, [carregar])

    return { post, loading, error, recarregar: carregar }
}
