import type { SeguidoDTO } from '../types/api'
import { del, get, post } from './http'

export function listarSeguindo(idUsuario: string) {
    return get<SeguidoDTO[]>(`/usuarios/${idUsuario}/seguindo`)
}

export function seguirUsuario(idUsuario: string, idSeguido: string) {
    return post<SeguidoDTO>(`/usuarios/${idUsuario}/seguindo`, { idSeguido })
}

export function deixarDeSeguir(idUsuario: string, idSeguido: string) {
    return del(`/usuarios/${idUsuario}/seguindo/${idSeguido}`)
}
