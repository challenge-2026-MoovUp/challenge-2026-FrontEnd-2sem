import type { CurtidaDTO, NovaCurtida, NovaPostagem, PostagemDTO } from '../types/api'
import { get, post } from './http'

export function listarPostagens() {
    return get<PostagemDTO[]>('/postagens')
}

export function criarPostagem(body: NovaPostagem) {
    return post<PostagemDTO>('/postagens', body)
}

/** A curtida é por usuário: repetir devolve 422. Descurtir não existe. */
export function curtirPostagem(id: string, body: NovaCurtida) {
    return post<CurtidaDTO>(`/postagens/${id}/curtidas`, body)
}
