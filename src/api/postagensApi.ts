/* Endpoints de postagens. Criar uma postagem credita pontos ao autor:
   TEXTO 50, IMAGEM 100, VIDEO 150 (ver divergência em docs/INTEGRACAO-API.md). */

import type { NovaPostagem, PostagemDTO } from '../types/api'
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

/* TODO(contrato): não existe endpoint para curtir postagem — o contrato devolve
   o campo "curtidas" mas não expõe como incrementá-lo. Enquanto não houver, o
   botão de curtir do feed só soma pontos localmente (WalletProvider). */
