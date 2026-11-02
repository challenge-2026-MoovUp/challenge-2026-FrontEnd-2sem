import type { CurtidaDTO, NovaCurtida, NovaPostagem, PostagemAlteracao, PostagemDTO } from '../types/api'
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

export function atualizarPostagem(id: string, body: PostagemAlteracao) {
    return put<PostagemDTO>(`/postagens/${id}`, body)
}

export function excluirPostagem(id: string) {
    return del(`/postagens/${id}`)
}

/** A curtida é por usuário: repetir devolve 422. Descurtir não existe. */
export function curtirPostagem(id: string, body: NovaCurtida) {
    return post<CurtidaDTO>(`/postagens/${id}/curtidas`, body)
}
