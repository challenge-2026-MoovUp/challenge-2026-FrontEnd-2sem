import type { EstacaoDTO, LinhaDTO, NovaViagem, ViagemDTO } from '../types/api'
import { get, post } from './http'

export function registrarViagem(idUsuario: string, body: NovaViagem) {
    return post<ViagemDTO>(`/usuarios/${idUsuario}/viagens`, body)
}

export function listarViagens(idUsuario: string) {
    return get<ViagemDTO[]>(`/usuarios/${idUsuario}/viagens`)
}

export function listarLinhas() {
    return get<LinhaDTO[]>('/linhas')
}

export function listarEstacoes(codigoLinha: string) {
    return get<EstacaoDTO[]>(`/linhas/${codigoLinha}/estacoes`)
}
