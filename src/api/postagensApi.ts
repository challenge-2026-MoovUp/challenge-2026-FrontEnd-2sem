/* Endpoints de postagens. Criar uma postagem credita pontos ao autor:
   TEXTO 50, IMAGEM 100, VIDEO 150 (ver divergência em docs/INTEGRACAO-API.md). */

import type { CurtidaDTO, NovaCurtida, NovaPostagem, PostagemDTO } from '../types/api'
import { del, get, post, put } from './http'

export function listarPostagens() {
    return get<PostagemDTO[]>('/postagens')
}

export function buscarPostagem(id: string) {
    return get<PostagemDTO>(`/postagens/${id}`)
}

export function criarPostagem(body: NovaPostagem) {
    return post<PostagemDTO>('/postagens', body)
}

export function atualizarPostagem(id: string, body: NovaPostagem) {
    return put<PostagemDTO>(`/postagens/${id}`, body)
}

export function excluirPostagem(id: string) {
    return del(`/postagens/${id}`)
}

/** POST /postagens/{id}/curtidas — 201 { idPostagem, curtidas }.
    A curtida é por usuário: repetir devolve 422 "O usuário já curtiu esta
    postagem". Descurtir não existe — a rota só aceita POST (Allow: POST). */
export function curtirPostagem(id: string, body: NovaCurtida) {
    return post<CurtidaDTO>(`/postagens/${id}/curtidas`, body)
}
