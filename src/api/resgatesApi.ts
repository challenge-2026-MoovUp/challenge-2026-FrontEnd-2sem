import type { NovoResgate, ResgateDTO, TicketDTO } from '../types/api'
import { get, post } from './http'

export function resgatar(idUsuario: string, body: NovoResgate) {
    return post<ResgateDTO>(`/usuarios/${idUsuario}/resgates`, body)
}

export function listarResgates(idUsuario: string) {
    return get<TicketDTO[]>(`/usuarios/${idUsuario}/resgates`)
}
