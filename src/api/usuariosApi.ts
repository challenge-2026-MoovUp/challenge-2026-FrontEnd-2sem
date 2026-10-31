/* Endpoints de usuários, login, ranking e impacto ambiental. */

import type {
    AtualizacaoUsuario,
    Credenciais,
    ImpactoDTO,
    ImpactoHistoricoItemDTO,
    NovoUsuario,
    RankingItemDTO,
    UsuarioDTO,
} from '../types/api'
import { del, get, post, put } from './http'

/** POST /usuarios — 201. Erros: 400, 422 (e-mail já existe). */
export function criarUsuario(body: NovoUsuario) {
    return post<UsuarioDTO>('/usuarios', body)
}

/** POST /usuarios/login — 200. Erros: 400, 401. Sem token: guardar o id. */
export function login(body: Credenciais) {
    return post<UsuarioDTO>('/usuarios/login', body)
}

export function listarUsuarios() {
    return get<UsuarioDTO[]>('/usuarios')
}

export function buscarUsuario(id: string) {
    return get<UsuarioDTO>(`/usuarios/${id}`)
}

export function atualizarUsuario(id: string, body: AtualizacaoUsuario) {
    return put<UsuarioDTO>(`/usuarios/${id}`, body)
}

export function excluirUsuario(id: string) {
    return del(`/usuarios/${id}`)
}

/** GET /usuarios/ranking — maior saldo primeiro. */
export function listarRanking() {
    return get<RankingItemDTO[]>('/usuarios/ranking')
}

/* TODO(contrato): o formato da resposta de GET /usuarios/{id}/pontos veio
   cortado na mensagem. Até confirmarem, o saldo sai de buscarUsuario().saldoPontos. */
export function buscarPontos(id: string) {
    return get<{ saldoPontos: number }>(`/usuarios/${id}/pontos`)
}

export function buscarImpacto(id: string) {
    return get<ImpactoDTO>(`/usuarios/${id}/impacto`)
}

export function listarImpactoHistorico(id: string) {
    return get<ImpactoHistoricoItemDTO[]>(`/usuarios/${id}/impacto/historico`)
}
