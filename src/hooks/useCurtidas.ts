import { useEffect, useState } from 'react'

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
