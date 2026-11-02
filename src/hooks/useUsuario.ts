import { useCallback, useEffect, useState } from 'react'
import { mensagemDe } from '../api/http'
import { criarComentario, excluirComentario, listarComentarios } from '../api/comentariosApi'
import { atualizarPostagem, excluirPostagem, listarPostagens } from '../api/postagensApi'
import {
    atualizarUsuario,
    buscarImpacto,
    excluirUsuario,
    listarImpactoHistorico,
    listarUsuarios,
} from '../api/usuariosApi'
import { handleDe, toFeedPost, toImpactoItem, toImpactoResumo, toPerfilUsuario, tituloDe } from '../mappers/feedMapper'
import type { UsuarioAlteracao, UsuarioDTO } from '../types/api'
import type { FeedPost } from '../types/feed'
import type { ImpactoItem, ImpactoResumo, PerfilUsuario } from '../types/perfil'
import { curtirPost } from './useCurtidas'

export function useUsuario(handle: string | undefined) {
    const [perfil, setPerfil] = useState<PerfilUsuario | null>(null)
    const [impacto, setImpacto] = useState<ImpactoResumo | null>(null)
    const [historico, setHistorico] = useState<ImpactoItem[]>([])
    const [posts, setPosts] = useState<FeedPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const carregar = useCallback(async () => {
        if (!handle) return

        setLoading(true)
        setError(null)

        try {
            const usuarios = await listarUsuarios()
            const usuario = usuarios.find((item) => handleDe(item.nome) === `@${handle.toLowerCase()}`)

            if (!usuario) {
                setError(`Nenhum usuário com o @${handle}`)
                setPerfil(null)
                setPosts([])
                return
            }

            const [resumo, itens, postagens] = await Promise.all([
                buscarImpacto(usuario.id),
                listarImpactoHistorico(usuario.id),
                listarPostagens(),
            ])
            const minhas = postagens.filter((postagem) => postagem.idUsuario === usuario.id)
            const comentarios = await Promise.all(minhas.map((postagem) => listarComentarios(postagem.id)))

            setPerfil(toPerfilUsuario(usuario))
            setImpacto(toImpactoResumo(resumo))
            setHistorico(itens.map(toImpactoItem))
            setPosts(minhas.map((postagem, i) => toFeedPost(postagem, comentarios[i])))
        } catch (erro) {
            setError(mensagemDe(erro, 'Falha ao carregar o perfil'))
            setPerfil(null)
            setPosts([])
        } finally {
            setLoading(false)
        }
    }, [handle])

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

    async function editarConta(body: UsuarioAlteracao): Promise<{ ok: boolean; reason?: string; usuario?: UsuarioDTO }> {
        try {
            const usuario = await atualizarUsuario(perfil?.id as string, body)
            setPerfil(toPerfilUsuario(usuario))
            return { ok: true, usuario }
        } catch (erro) {
            return { ok: false, reason: mensagemDe(erro, 'Falha ao editar a conta') }
        }
    }

    async function excluirConta() {
        try {
            await excluirUsuario(perfil?.id as string)
            return { ok: true }
        } catch (erro) {
            return { ok: false, reason: mensagemDe(erro, 'Falha ao excluir a conta') }
        }
    }

    return {
        perfil,
        impacto,
        historico,
        posts,
        loading,
        error,
        recarregar: carregar,
        editarConta,
        excluirConta,
        curtir: (idPostagem: string, idUsuario: string) => curtirPost(idPostagem, idUsuario, setPosts),
        comentar: (idPostagem: string, idUsuario: string, conteudo: string) =>
            executar(() => criarComentario(idPostagem, { idUsuario, conteudo }), 'Falha ao comentar'),
        editarPostagem: (idPostagem: string, conteudo: string) =>
            executar(() => atualizarPostagem(idPostagem, { titulo: tituloDe(conteudo), conteudo }), 'Falha ao editar'),
        excluirPostagem: (idPostagem: string) => executar(() => excluirPostagem(idPostagem), 'Falha ao excluir'),
        excluirResposta: (idComentario: string) =>
            executar(() => excluirComentario(idComentario), 'Falha ao excluir a resposta'),
    }
}
