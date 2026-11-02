import type {
    Credenciais,
    ImpactoDTO,
    ImpactoHistoricoDTO,
    NovoUsuario,
    PontosDTO,
    RankingDTO,
    UsuarioAlteracao,
    UsuarioDTO,
} from '../types/api'
import { del, get, post, put } from './http'

export function criarUsuario(body: NovoUsuario) {
    return post<UsuarioDTO>('/usuarios', body)
}

/** O contrato não tem token: o login devolve o usuário e o front guarda o id. */
export function login(body: Credenciais) {
    return post<UsuarioDTO>('/usuarios/login', body)
}

export function listarUsuarios() {
    return get<UsuarioDTO[]>('/usuarios')
}

export function listarRanking() {
    return get<RankingDTO[]>('/usuarios/ranking')
}

export function buscarPontos(id: string) {
    return get<PontosDTO>(`/usuarios/${id}/pontos`)
}

export function buscarUsuario(id: string) {
    return get<UsuarioDTO>(`/usuarios/${id}`)
}

export function atualizarUsuario(id: string, body: UsuarioAlteracao) {
    return put<UsuarioDTO>(`/usuarios/${id}`, body)
}

export function excluirUsuario(id: string) {
    return del(`/usuarios/${id}`)
}

export function buscarImpacto(id: string) {
    return get<ImpactoDTO>(`/usuarios/${id}/impacto`)
}

export function listarImpactoHistorico(id: string) {
    return get<ImpactoHistoricoDTO[]>(`/usuarios/${id}/impacto/historico`)
}
