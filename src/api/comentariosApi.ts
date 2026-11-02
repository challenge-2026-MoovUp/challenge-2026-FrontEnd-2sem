import type { ComentarioDTO, NovoComentario } from '../types/api'
import { get, post } from './http'

export function listarComentarios(idPostagem: string) {
    return get<ComentarioDTO[]>(`/postagens/${idPostagem}/comentarios`)
}

export function criarComentario(idPostagem: string, body: NovoComentario) {
    return post<ComentarioDTO>(`/postagens/${idPostagem}/comentarios`, body)
}
