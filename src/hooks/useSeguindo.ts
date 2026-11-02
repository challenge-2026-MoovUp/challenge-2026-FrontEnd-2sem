import { useEffect, useState } from 'react'
import { ApiError, mensagemDe } from '../api/http'
import { deixarDeSeguir, listarSeguindo, seguirUsuario } from '../api/seguindoApi'

export function useSeguindo(userId: string | null) {
    const [seguindo, setSeguindo] = useState<string[]>([])

    useEffect(() => {
        async function carregar() {
            if (!userId) {
                setSeguindo([])
                return
            }

            try {
                const lista = await listarSeguindo(userId)
                setSeguindo(lista.map((usuario) => usuario.id))
            } catch {
                setSeguindo([])
            }
        }

        void carregar()
    }, [userId])

    async function alternarSeguir(idUsuario: string, idSeguido: string) {
        try {
            if (seguindo.includes(idSeguido)) {
                await deixarDeSeguir(idUsuario, idSeguido)
                setSeguindo((anteriores) => anteriores.filter((id) => id !== idSeguido))
            } else {
                await seguirUsuario(idUsuario, idSeguido)
                setSeguindo((anteriores) => [...anteriores, idSeguido])
            }
            return { ok: true }
        } catch (erro) {
            if (erro instanceof ApiError && erro.status === 404) {
                return { ok: false, reason: 'Seguir ainda não está disponível' }
            }
            return { ok: false, reason: mensagemDe(erro, 'Falha ao atualizar quem você segue') }
        }
    }

    return { seguindo, alternarSeguir }
}
