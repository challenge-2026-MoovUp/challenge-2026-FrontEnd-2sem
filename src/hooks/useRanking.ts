import { useEffect, useState } from 'react'
import { mensagemDe } from '../api/http'
import { listarRanking } from '../api/usuariosApi'
import { toPerfilRanking } from '../mappers/feedMapper'
import type { SuggestedProfile } from '../types/feed'

export function useRanking() {
    const [perfis, setPerfis] = useState<SuggestedProfile[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function carregar() {
            try {
                const ranking = await listarRanking()
                setPerfis(ranking.map(toPerfilRanking))
            } catch (erro) {
                setError(mensagemDe(erro, 'Falha ao carregar o ranking'))
            } finally {
                setLoading(false)
            }
        }

        void carregar()
    }, [])

    return { perfis, loading, error }
}
