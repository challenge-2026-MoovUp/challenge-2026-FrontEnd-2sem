/* Tipo de tela do perfil. Como em types/feed.ts, nada aqui é DTO: o mapper
   traduz UsuarioDTO → PerfilUsuario para a página não importar types/api.ts. */

import type { FeedAuthor } from './feed'

export interface PerfilUsuario extends FeedAuthor {
    email: string
    saldoPontos: number
    /** Já formatado para leitura: "outubro de 2026". */
    membroDesde: string
    /** false quando o usuário está inativo (status 'I' no contrato). */
    ativo: boolean
}
