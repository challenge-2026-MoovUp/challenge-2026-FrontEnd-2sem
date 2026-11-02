import { useCallback, useEffect, useState } from 'react'
import { mensagemDe } from '../api/http'
import { listarResgates, resgatar } from '../api/resgatesApi'
import { buscarEstoque, marcarTicketUtilizado } from '../api/ticketsApi'
import { buscarPontos } from '../api/usuariosApi'
import { listarEstacoes, listarLinhas, listarViagens, registrarViagem } from '../api/viagensApi'
import { modalidadePorOpcao, toRedemption, toTicketOption, toTrip } from '../mappers/walletMapper'
import type { Redemption, RedemptionDelivery, TicketOption, Trip } from '../types/wallet'
import { WalletContext } from './walletContext'

export function WalletProvider({ userId, children }: { userId: string | null; children: React.ReactNode }) {
    const [points, setPoints] = useState(0)
    const [trips, setTrips] = useState<Trip[]>([])
    const [redemptions, setRedemptions] = useState<Redemption[]>([])
    const [tickets, setTickets] = useState<TicketOption[]>([])
    const [estoque, setEstoque] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const recarregar = useCallback(async () => {
        setError(null)

        if (!userId) {
            setPoints(0)
            setTrips([])
            setRedemptions([])
            setTickets([])
            setEstoque(0)
            return
        }

        setLoading(true)

        try {
            const [pontos, resgates, viagens, linhas, disponivel] = await Promise.all([
                buscarPontos(userId),
                listarResgates(userId),
                listarViagens(userId),
                listarLinhas(),
                buscarEstoque(),
            ])
            const linhasUsadas = [...new Set(viagens.map((viagem) => viagem.linha))]
            const estacoes = await Promise.all(linhasUsadas.map(listarEstacoes))
            const nomesLinhas = new Map(linhas.map((linha) => [linha.codigo, linha.nome]))
            const nomesEstacoes = new Map(estacoes.flat().map((estacao) => [estacao.codigo, estacao.nome]))
            const ticketsComViagem = viagens.map((viagem) => viagem.idTicket)

            setPoints(pontos.saldoPontos)
            setTrips(viagens.map((viagem) => toTrip(viagem, nomesLinhas, nomesEstacoes)))
            setRedemptions(resgates.map(toRedemption))
            setTickets(
                resgates
                    .filter(
                        (ticket) =>
                            ticket.status === 'RESERVADO' ||
                            (ticket.status === 'UTILIZADO' && !ticketsComViagem.includes(ticket.id)),
                    )
                    .map(toTicketOption),
            )
            setEstoque(disponivel.disponiveis)
        } catch (erro) {
            setError(mensagemDe(erro, 'Falha ao carregar a carteira'))
        } finally {
            setLoading(false)
        }
    }, [userId])

    useEffect(() => {
        void recarregar()
    }, [recarregar])

    async function registerTrip(idTicket: string, linha: string, estacao: string) {
        if (!userId) return { ok: false, reason: 'Entre na sua conta.' }

        try {
            const ticket = tickets.find((item) => item.id === idTicket)
            if (ticket?.status === 'RESERVADO') await marcarTicketUtilizado(idTicket)
            await registrarViagem(userId, { idTicket, linha, estacaoEmbarque: estacao })
            await recarregar()
            return { ok: true }
        } catch (erro) {
            await recarregar()
            return { ok: false, reason: mensagemDe(erro, 'Não foi possível registrar a viagem.') }
        }
    }

    async function redeem(optionId: string, delivery: RedemptionDelivery, cardNumber?: string) {
        if (!userId) return { ok: false, reason: 'Entre na sua conta.' }

        try {
            const { ticket } = await resgatar(userId, {
                modalidade: modalidadePorOpcao[optionId],
                formaRecebimento: delivery === 'recarga' ? 'RECARGA' : 'QR_CODE',
            })
            await recarregar()
            return { ok: true, redemption: { ...toRedemption(ticket), cardNumber } }
        } catch (erro) {
            return { ok: false, reason: mensagemDe(erro, 'Não foi possível concluir o resgate.') }
        }
    }

    return (
        <WalletContext.Provider
            value={{ points, trips, redemptions, tickets, estoque, loading, error, recarregar, registerTrip, redeem }}
        >
            {children}
        </WalletContext.Provider>
    )
}
