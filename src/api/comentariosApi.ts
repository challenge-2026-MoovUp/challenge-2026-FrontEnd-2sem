/* Endpoints de comentários. Note que criar e listar penduram na postagem,
   mas excluir é na raiz: DELETE /comentarios/{id}. */

import type { ComentarioDTO, NovoComentario } from '../types/api'
import { del, get, post } from './http'

export function listarComentarios(idPostagem: string) {
    return get<ComentarioDTO[]>(`/postagens/${idPostagem}/comentarios`)
}

export function criarComentario(idPostagem: string, body: NovoComentario) {
    return post<ComentarioDTO>(`/postagens/${idPostagem}/comentarios`, body)
}

export function excluirComentario(id: string) {
    return del(`/comentarios/${id}`)
}
