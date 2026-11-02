import type { EstoqueDTO, TicketDTO } from '../types/api'
import { get, patch } from './http'

export function buscarEstoque() {
    return get<EstoqueDTO>('/tickets/estoque')
}

export function marcarTicketUtilizado(id: string) {
    return patch<TicketDTO>(`/tickets/${id}/uso`)
}
