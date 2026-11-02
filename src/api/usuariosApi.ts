import type { Credenciais, NovoUsuario, PontosDTO, RankingDTO, UsuarioDTO } from '../types/api'
import { get, post } from './http'

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
