import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { ApiError, mensagemDe } from '../api/http'
import { curtirPostagem } from '../api/postagensApi'
import type { FeedPost } from '../types/feed'

function storageKey(userId: string | null) {
    return `moovup:curtidas:${userId ?? 'visitante'}`
}

function lerCurtidas(userId: string | null): string[] {
    try {
        const raw = localStorage.getItem(storageKey(userId))
        return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
        return []
    }
}

function salvarCurtidas(userId: string | null, curtidas: string[]) {
    try {
        localStorage.setItem(storageKey(userId), JSON.stringify(curtidas))
    } catch {
        return
    }
}

export async function curtirPost(
    idPostagem: string,
    idUsuario: string,
    setPosts: Dispatch<SetStateAction<FeedPost[]>>,
) {
    const alterarCurtidas = (calcular: (likes: number) => number) =>
        setPosts((anteriores) =>
            anteriores.map((post) => (post.id === idPostagem ? { ...post, likes: calcular(post.likes) } : post)),
        )

    alterarCurtidas((likes) => likes + 1)

    try {
        const { curtidas } = await curtirPostagem(idPostagem, { idUsuario })
        alterarCurtidas(() => curtidas)
        return { ok: true }
    } catch (erro) {
        alterarCurtidas((likes) => likes - 1)
        if (erro instanceof ApiError && erro.status === 422) return { ok: true }
        return { ok: false, reason: mensagemDe(erro, 'Falha ao curtir') }
    }
}

export function useCurtidas(userId: string | null) {
    const [curtidas, setCurtidas] = useState<string[]>(() => lerCurtidas(userId))

    useEffect(() => {
        setCurtidas(lerCurtidas(userId))
    }, [userId])

    function atualizar(calcular: (anteriores: string[]) => string[]) {
        setCurtidas((anteriores) => {
            const proximas = calcular(anteriores)
            salvarCurtidas(userId, proximas)
            return proximas
        })
    }

    function marcarCurtida(id: string) {
        atualizar((anteriores) => [...anteriores, id])
    }

    function desmarcarCurtida(id: string) {
        atualizar((anteriores) => anteriores.filter((item) => item !== id))
    }

    return { curtidas, marcarCurtida, desmarcarCurtida }
}
