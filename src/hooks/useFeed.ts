import { useCallback, useEffect, useState } from 'react'
import { mensagemDe } from '../api/http'
import { atualizarPostagem, criarPostagem, excluirPostagem, listarPostagens } from '../api/postagensApi'
import { criarComentario, excluirComentario, listarComentarios } from '../api/comentariosApi'
import { toFeedPost } from '../mappers/feedMapper'
import type { NovaPostagem, NovoComentario, PostagemAlteracao } from '../types/api'
import type { FeedPost } from '../types/feed'
import { curtirPost } from './useCurtidas'

export function useFeed() {
    const [posts, setPosts] = useState<FeedPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const carregar = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const postagens = await listarPostagens()
            const comentarios = await Promise.all(postagens.map((postagem) => listarComentarios(postagem.id)))

            setPosts(postagens.map((postagem, i) => toFeedPost(postagem, comentarios[i])))
        } catch (erro) {
            setError(mensagemDe(erro, 'Falha ao carregar o feed'))
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void carregar()
    }, [carregar])

    async function executar(acao: () => Promise<unknown>, falha: string) {
        try {
            await acao()
            await carregar()
            return { ok: true }
        } catch (erro) {
            return { ok: false, reason: mensagemDe(erro, falha) }
        }
    }

    return {
        posts,
        loading,
        error,
        recarregar: carregar,
        publicar: (body: NovaPostagem) => executar(() => criarPostagem(body), 'Falha ao publicar'),
        comentar: (idPostagem: string, body: NovoComentario) =>
            executar(() => criarComentario(idPostagem, body), 'Falha ao comentar'),
        curtir: (idPostagem: string, idUsuario: string) => curtirPost(idPostagem, idUsuario, setPosts),
        editar: (id: string, body: PostagemAlteracao) => executar(() => atualizarPostagem(id, body), 'Falha ao editar'),
        excluir: (id: string) => executar(() => excluirPostagem(id), 'Falha ao excluir'),
        excluirResposta: (id: string) => executar(() => excluirComentario(id), 'Falha ao excluir a resposta'),
    }
}
