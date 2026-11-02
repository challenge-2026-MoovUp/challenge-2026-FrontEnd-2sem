import { useCallback, useEffect, useState } from 'react'
import { mensagemDe } from '../api/http'
import { buscarEstoque, buscarTicket, criarTickets, excluirTicket, listarTickets } from '../api/ticketsApi'
import type { EstoqueDTO, Modalidade, NovoLoteTickets, StatusTicket, TicketDTO } from '../types/api'

export function useAdminTickets() {
    const [tickets, setTickets] = useState<TicketDTO[]>([])
    const [estoque, setEstoque] = useState<EstoqueDTO | null>(null)
    const [detalhe, setDetalhe] = useState<TicketDTO | null>(null)
    const [status, setStatus] = useState<StatusTicket | ''>('')
    const [modalidade, setModalidade] = useState<Modalidade | ''>('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const carregar = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const [lista, totais] = await Promise.all([listarTickets(status, modalidade), buscarEstoque()])
            setTickets(lista)
            setEstoque(totais)
        } catch (erro) {
            setError(mensagemDe(erro, 'Falha ao carregar os tickets'))
        } finally {
            setLoading(false)
        }
    }, [status, modalidade])

    useEffect(() => {
        void carregar()
    }, [carregar])

    async function abastecer(body: NovoLoteTickets) {
        setError(null)

        try {
            await criarTickets(body)
            await carregar()
        } catch (erro) {
            setError(mensagemDe(erro, 'Falha ao criar os tickets'))
        }
    }

    async function excluir(id: string) {
        setError(null)

        try {
            await excluirTicket(id)
            setDetalhe(null)
            await carregar()
        } catch (erro) {
            setError(mensagemDe(erro, 'Falha ao excluir o ticket'))
        }
    }

    async function verDetalhe(id: string) {
        setError(null)

        try {
            setDetalhe(await buscarTicket(id))
        } catch (erro) {
            setError(mensagemDe(erro, 'Falha ao buscar o ticket'))
        }
    }

    return {
        tickets,
        estoque,
        detalhe,
        status,
        modalidade,
        loading,
        error,
        setStatus,
        setModalidade,
        abastecer,
        excluir,
        verDetalhe,
    }
}
