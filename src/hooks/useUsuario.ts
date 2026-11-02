import { useCallback, useEffect, useState } from 'react'
import { ApiError, mensagemDe } from '../api/http'
import { listarComentarios } from '../api/comentariosApi'
import { listarPostagens } from '../api/postagensApi'
import { buscarUsuario } from '../api/usuariosApi'
import { toFeedPost, toPerfilUsuario } from '../mappers/feedMapper'
import type { FeedPost } from '../types/feed'
import type { PerfilUsuario } from '../types/perfil'
import { curtirPost } from './useCurtidas'

export function useUsuario(id: string | undefined) {
    const [perfil, setPerfil] = useState<PerfilUsuario | null>(null)
    const [posts, setPosts] = useState<FeedPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [naoEncontrado, setNaoEncontrado] = useState(false)

    const carregar = useCallback(async () => {
        if (!id) {
            setError('Usuário não informado')
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)
        setNaoEncontrado(false)

        try {
            const [usuario, postagens] = await Promise.all([buscarUsuario(id), listarPostagens()])
            const minhas = postagens.filter((postagem) => postagem.idUsuario === id)

            const comentarios = await Promise.all(
                minhas.map((postagem) => listarComentarios(postagem.id)),
            )

            setPerfil(toPerfilUsuario(usuario))
            setPosts(minhas.map((postagem, i) => toFeedPost(postagem, comentarios[i])))
        } catch (erro) {
            if (erro instanceof ApiError && erro.status === 404) setNaoEncontrado(true)
            setError(mensagemDe(erro, 'Falha ao carregar o perfil'))
            setPerfil(null)
            setPosts([])
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        void carregar()
    }, [carregar])

    return {
        perfil,
        posts,
        loading,
        error,
        naoEncontrado,
        recarregar: carregar,
        curtir: (idPostagem: string, idUsuario: string) => curtirPost(idPostagem, idUsuario, setPosts),
    }
}
