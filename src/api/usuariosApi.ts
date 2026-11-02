import type { Credenciais, NovoUsuario, UsuarioDTO } from '../types/api'
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

export function buscarUsuario(id: string) {
    return get<UsuarioDTO>(`/usuarios/${id}`)
}
