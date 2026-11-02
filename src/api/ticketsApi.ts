import type { EstoqueDTO, Modalidade, NovoLoteTickets, StatusTicket, TicketDTO } from '../types/api'
import { del, get, patch, post } from './http'

export function buscarEstoque() {
    return get<EstoqueDTO>('/tickets/estoque')
}

export function listarTickets(status: StatusTicket | '', modalidade: Modalidade | '') {
    const query = new URLSearchParams()
    if (status) query.set('status', status)
    if (modalidade) query.set('modalidade', modalidade)
    return get<TicketDTO[]>(`/tickets?${query}`)
}

export function buscarTicket(id: string) {
    return get<TicketDTO>(`/tickets/${id}`)
}

export function criarTickets(body: NovoLoteTickets) {
    return post<TicketDTO[]>('/tickets', body)
}

export function marcarTicketUtilizado(id: string) {
    return patch<TicketDTO>(`/tickets/${id}/uso`)
}

export function excluirTicket(id: string) {
    return del(`/tickets/${id}`)
}
