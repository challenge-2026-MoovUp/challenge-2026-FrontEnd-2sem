/* Consulta de tickets e gestão de estoque (admin). */

import type {
    EstoqueTicketsDTO,
    FiltroTickets,
    NovoLoteTickets,
    TicketDTO,
} from '../types/api'
import { del, get, patch, post } from './http'

/** GET /tickets?status=DISPONIVEL&modalidade=METRO — filtros opcionais. */
export function listarTickets(filtro: FiltroTickets = {}) {
    const query = new URLSearchParams()
    if (filtro.status) query.set('status', filtro.status)
    if (filtro.modalidade) query.set('modalidade', filtro.modalidade)

    const sufixo = query.size > 0 ? `?${query}` : ''
    return get<TicketDTO[]>(`/tickets${sufixo}`)
}

export function buscarTicket(id: string) {
    return get<TicketDTO>(`/tickets/${id}`)
}

export function buscarEstoque() {
    return get<EstoqueTicketsDTO>('/tickets/estoque')
}

/* ---------- Admin ---------- */

/** POST /tickets — cria N tickets DISPONIVEL de uma modalidade. */
export function criarLoteTickets(body: NovoLoteTickets) {
    return post<TicketDTO[]>('/tickets', body)
}

/** PATCH /tickets/{id}/uso — marca como UTILIZADO. Erros: 404, 422. */
export function marcarTicketUtilizado(id: string) {
    return patch<TicketDTO>(`/tickets/${id}/uso`)
}

export function excluirTicket(id: string) {
    return del(`/tickets/${id}`)
}
